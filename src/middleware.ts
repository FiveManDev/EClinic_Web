import jwt_decode from "jwt-decode"
// middleware.ts
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { authService } from "services/auth.service"
import { ROLE } from "shared/constant/constant"
import { ITokenDecode } from "types/Token.type"
const unprotectedPaths: string[] = [
  "/",
  "/search",
  `/sign-in`,
  `/sign-up`,
  "/services",
  "/forum"
]

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith("/_next")) return NextResponse.next()

  const { cookies } = req
  const accessToken = cookies.get(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string
  )?.value
  const refreshToken = cookies.get(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string
  )?.value
  if (!accessToken && refreshToken) {
    const result = await authService.refreshToken()
    if (result.isSuccess) {
      cookies.set(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string,
        result.data.accessToken
      )
      cookies.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string,
        result.data.refreshToken
      )
    } else {
      cookies.delete([
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string,
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string
      ])
    }
  }
  if (accessToken) {
    try {
      const payload = jwt_decode(accessToken) as ITokenDecode
      const role = payload.role
      switch (true) {
        case pathname.includes("/user") && Object.values(ROLE).includes(role):
        case pathname.includes("/doctor") && role === ROLE.DOCTOR:
        case pathname.includes("/sup") && role === ROLE.SUPPORTER:
        case pathname.includes("/admin") && role === ROLE.ADMIN:
          return NextResponse.next()
        case pathname.includes("/sign-in") || pathname.includes("/sign-up"):
          req.nextUrl.pathname = "/"
          return NextResponse.redirect(req.nextUrl)
        default:
          break
      }
    } catch (e) {
      req.nextUrl.pathname = "/"
      return NextResponse.redirect(req.nextUrl)
    }
  }
  const checkRouter = unprotectedPaths.some((path) => {
    console.log("checkRouter ~ pathname:", pathname)
    if (pathname === "/") {
      return true
    } else {
      return path.includes(pathname)
    }
  })
  console.log("checkRouter ~ checkRouter:", checkRouter)
  if (checkRouter) {
    return NextResponse.next()
  } else {
    req.nextUrl.pathname = "/sign-in"
    return NextResponse.redirect(req.nextUrl)
  }
}
export const config = { matcher: "/((?!.*\\.).*)" }
