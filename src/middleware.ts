import jwt_decode from "jwt-decode"
// middleware.ts
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { authService } from "services/auth.service"
import { DEFAULT_ROUTER, ROLE } from "shared/constant/constant"
import { ITokenDecode } from "types/Token"

const unprotectedPaths: string[] = [
  "/",
  "search",
  `sign-in`,
  `sign-up`,
  `reset-password`,
  "services",
  "doctors",
  "forum",
  "blog"
]
const pathDefaultByRole = (role: string) =>
  role === ROLE.USER
    ? DEFAULT_ROUTER.USER
    : role === ROLE.ADMIN
    ? DEFAULT_ROUTER.ADMIN
    : role === ROLE.DOCTOR
    ? DEFAULT_ROUTER.DOCTOR
    : DEFAULT_ROUTER.SUPPORTER
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
    const result = await authService.refreshToken(refreshToken)
    if (result?.isSuccess) {
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
  const checkRouter = unprotectedPaths.some((path) => {
    if (pathname === "/") {
      return true
    } else {
      console.log(pathname.startsWith(path))
      return pathname.startsWith(path)
    }
  })
  if (accessToken) {
    try {
      const payload = jwt_decode(accessToken) as ITokenDecode
      const role = payload.role
      if (checkRouter && role !== "User") {
        req.nextUrl.pathname = pathDefaultByRole(role)
        return NextResponse.redirect(req.nextUrl)
      }
      switch (true) {
        case pathname.includes(DEFAULT_ROUTER.USER) &&
          Object.values(ROLE).includes(role):
        case pathname.includes(DEFAULT_ROUTER.DOCTOR) && role === ROLE.DOCTOR:
        case pathname.includes(DEFAULT_ROUTER.SUPPORTER) &&
          role === ROLE.SUPPORTER:
        case role === ROLE.ADMIN:
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

  if (checkRouter) {
    return NextResponse.next()
  } else {
    req.nextUrl.pathname = "/sign-in"
    return NextResponse.redirect(req.nextUrl)
  }
}
export const config = { matcher: "/((?!.*\\.).*)" }
