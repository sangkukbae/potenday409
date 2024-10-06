import { Controller, Get, Request, Response, UseGuards } from "@nestjs/common"

import { GoogleAuthGuard, KakaoAuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"

export interface JwtPayload {
  id: number
  user_name: string
  email: string
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("to-google") // 구글 로그인으로 이동하는 라우터 메서드
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req
    const { accessToken, refreshToken } =
      await this.authService.googleLogin(user)

    res.cookie("access_token", accessToken, { secure: true })
    res.cookie("refresh_token", refreshToken, { secure: true })

    if (!user.user_name) {
      return res.redirect("/nickname")
    } else {
      return res.redirect("/diary")
    }
  }

  @UseGuards(KakaoAuthGuard)
  @Get("to-kakao")
  async kakaoAuth() {}

  @Get("kakao")
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthRedirect(@Request() req, @Response() res) {
    const { user } = req
    const { accessToken, refreshToken } =
      await this.authService.kakaoLogin(user)

    res.cookie("access_token", accessToken, { secure: true }) // httpOnly 및 secure 설정
    res.cookie("refresh_token", refreshToken, { secure: true }) // httpOnly 및 secure 설정

    if (!user.user_name) {
      return res.redirect("/nickname")
    } else {
      return res.redirect("/diary")
    }
  }
}
