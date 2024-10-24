import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common"

import { GoogleAuthGuard, JwtGuard, KakaoAuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"

export interface JwtPayload {
  id: number
  user_name: string
  email: string
}

@Controller("v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Google OAuth
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  async initiateGoogleAuth() {
    // Guard will redirect to Google
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleGoogleCallback(@Request() req, @Response() res) {
    const { user } = req
    const { accessToken, refreshToken } =
      await this.authService.googleLogin(user)

    // Set secure cookies
    res.cookie("access_token", accessToken, {
      //httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    res.cookie("refresh_token", refreshToken, {
      //httpOnly: true,
      secure: true,
      sameSite: "strict",
    })

    // Redirect based on user state
    const redirectUrl = user.user_name ? "/diary" : "/nickname"
    return res.redirect(redirectUrl)
  }

  // Kakao OAuth
  @Get("kakao/login")
  @UseGuards(KakaoAuthGuard)
  async initiateKakaoAuth() {
    // Guard will redirect to Kakao
  }

  @Get("kakao/callback")
  @UseGuards(KakaoAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleKakaoCallback(@Request() req, @Response() res) {
    const { user } = req
    const { accessToken, refreshToken } =
      await this.authService.kakaoLogin(user)

    // Set secure cookies
    res.cookie("access_token", accessToken, {
      //httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    res.cookie("refresh_token", refreshToken, {
      //httpOnly: true,
      secure: true,
      sameSite: "strict",
    })

    // Redirect based on user state
    const redirectUrl = user.user_name ? "/diary" : "/nickname"
    return res.redirect(redirectUrl)
  }

  // Token refresh
  @Post("token/refresh")
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Headers("authorization") authorization: string) {
    const refreshToken = authorization.replace("Bearer ", "")
    return this.authService.refreshAccessToken(refreshToken)
  }

  // @Post("logout")
  // @UseGuards(JwtGuard)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async logout(@Response() res) {
  //   res.clearCookie("access_token")
  //   res.clearCookie("refresh_token")
  //   return res.send()
  // }
}
