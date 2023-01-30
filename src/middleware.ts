import { authService } from "services/auth.service"
import jwt_decode from "jwt-decode"
// middleware.ts
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { ROLE, TOKEN } from "shared/constant/constant"
import { ITokenDecode } from "types/Token.type"
const unprotectedPaths: string[] = ["/", `/sign-in`, `/sign-up`]

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/_next")) return NextResponse.next()
  const { cookies } = req

  const accessToken = cookies.get(TOKEN.ACCESS)?.value
  const refreshToken = cookies.get(TOKEN.REFRESH)?.value
  if (accessToken) {
    try {
      const payload = jwt_decode(accessToken) as ITokenDecode
      const role = payload.role
      switch (true) {
        case pathname.includes("/user") &&
          [ROLE.USER, ROLE.ADMIN, ROLE.SUPPORTER, ROLE.DOCTOR].includes(role):
          return NextResponse.next()
        case pathname.includes("/doctor") && role === ROLE.DOCTOR:
          return NextResponse.next()
        case pathname.includes("/sup") && role === ROLE.SUPPORTER:
          return NextResponse.next()
        case pathname.includes("/admin") && role === ROLE.ADMIN:
          return NextResponse.next()
        case pathname.includes("/sign-in") || pathname.includes("/sign-up"):
          throw new Error()
        default:
          return NextResponse.next()
      }
    } catch (e) {
      req.nextUrl.pathname = "/"
      return NextResponse.redirect(req.nextUrl)
    }
  } else if (!accessToken && refreshToken) {
    const res = authService.refreshToken(accessToken, refreshToken)
    //call refresh token
  } else {
    if (unprotectedPaths.includes(pathname)) {
      return NextResponse.next()
    } else {
      req.nextUrl.pathname = "/sign-in"
      return NextResponse.redirect(req.nextUrl)
    }
  }
}
export const config = { matcher: "/((?!.*\\.).*)" }
