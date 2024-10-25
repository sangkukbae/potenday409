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
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"

import { GoogleAuthGuard, JwtGuard, KakaoAuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"

export interface JwtPayload {
  id: number
  user_name: string
  email: string
}

// API 그룹화
@ApiTags("Auth")
@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "Google OAuth 로그인 시작",
    description: "Google OAuth 인증 페이지로 리다이렉트합니다.",
  })
  @ApiResponse({
    status: 302,
    description: "Google 로그인 페이지로 리다이렉트",
  })
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  async initiateGoogleAuth() {}

  @ApiOperation({
    summary: "Google OAuth 콜백 처리",
    description: "Google OAuth 인증 후 콜백을 처리하고 토큰을 발급합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "인증 성공 및 토큰 발급",
  })
  @ApiResponse({
    status: 401,
    description: "인증 실패",
  })
  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleGoogleCallback(@Request() req, @Response() res) {
    const { user } = req
    const { accessToken, refreshToken } =
      await this.authService.googleLogin(user)

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

    const redirectUrl = user.user_name ? "/v1/diary" : "/v1/me"
    return res.redirect(redirectUrl)
  }

  @ApiOperation({
    summary: "Kakao OAuth 로그인 시작",
    description: "Kakao OAuth 인증 페이지로 리다이렉트합니다.",
  })
  @ApiResponse({
    status: 302,
    description: "Kakao 로그인 페이지로 리다이렉트",
  })
  @Get("kakao/login")
  @UseGuards(KakaoAuthGuard)
  async initiateKakaoAuth() {}

  @ApiOperation({
    summary: "Kakao OAuth 콜백 처리",
    description: "Kakao OAuth 인증 후 콜백을 처리하고 토큰을 발급합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "인증 성공 및 토큰 발급",
  })
  @ApiResponse({
    status: 401,
    description: "인증 실패",
  })
  @Get("kakao/callback")
  @UseGuards(KakaoAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleKakaoCallback(@Request() req, @Response() res) {
    const { user } = req
    const { accessToken, refreshToken } =
      await this.authService.kakaoLogin(user)

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

    const redirectUrl = user.user_name ? "/v1/diary" : "/v1/me"
    return res.redirect(redirectUrl)
  }

  @ApiOperation({
    summary: "토큰 갱신",
    description: "Refresh 토큰을 사용하여 새로운 Access 토큰을 발급받습니다.",
  })
  @ApiBearerAuth("refresh-token")
  @ApiHeader({
    name: "authorization",
    description: "Refresh token with Bearer prefix",
  })
  @ApiResponse({
    status: 200,
    description: "토큰 갱신 성공",
    schema: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          description: "새로 발급된 access token",
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "유효하지 않은 refresh token",
  })
  @Post("token/refresh")
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Headers("authorization") authorization: string) {
    const refreshToken = authorization.replace("Bearer ", "")
    return this.authService.refreshAccessToken(refreshToken)
  }
}
