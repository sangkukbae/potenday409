import { NextRequest, NextResponse } from "next/server"

import { COOKIE_KEY } from "./constants"
import { updateToken } from "./actions"

export default async function middleware(request: NextRequest) {
  // const { pathname, searchParams } = request.nextUrl

  const accessToken = request.cookies.get(COOKIE_KEY.ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(COOKIE_KEY.REFRESH_TOKEN)?.value

  if (!accessToken && refreshToken) {
    const data = await updateToken(refreshToken)

    if (data) {
      const { accessToken, refreshToken } = data
      const response = NextResponse.next()

      response.cookies.set(COOKIE_KEY.ACCESS_TOKEN, accessToken)
      response.cookies.set(COOKIE_KEY.REFRESH_TOKEN, refreshToken)
      return response
    }
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icon.png).*)",
  ],
}
