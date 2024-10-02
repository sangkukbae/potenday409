import { Controller, Get, Request, Response, UseGuards } from "@nestjs/common"

import { GoogleAuthGuard, KakaoAuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("to-google") // 구글 로그인으로 이동하는 라우터 메서드
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req: Request) {}

  @Get("google") //구글 로그인 후 콜백 실행 후 콜백 실행 후 이동 시 실행되는 라이터 메서드
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req
    if (!user) {
      return res.status(400).send({ message: "구글 유저 정보가 없습니다." })
    }
    return res.send({
      user,
      message: "success",
    })
  }

  @UseGuards(KakaoAuthGuard)
  @Get("to-kakao")
  async kakaoAuth(@Request() req, @Response() res) {}

  @Get("kakao") //구글 로그인 후 콜백 실행 후 콜백 실행 후 이동 시 실행되는 라이터 메서드
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthRedirect(@Request() req, @Response() res) {
    const { user } = req
    if (!user) {
      return res.status(400).send({ message: "카카오 유저정보가 없습니다." })
    }
    return res.send({
      user,
      message: "success",
    })
  }
}
