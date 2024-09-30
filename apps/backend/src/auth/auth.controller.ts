import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GoogleAuthGuard, KakaoAuthGuard } from "./auth.guard";
import { CreateUserDto } from "../user/user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  //calss-validator가 자동으로 유효성 검증
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Get("to-google") // 구글 로그인으로 이동하는 라우터 메서드
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req: Request) {}

  @Get("google") //구글 로그인 후 콜백 실행 후 콜백 실행 후 이동 시 실행되는 라이터 메서드
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }

  @UseGuards(KakaoAuthGuard)
  @Get("to-kakao")
  async kakaoAuth(@Body() body: any, @Response() res): Promise<any> {
    try {
      // 카카오 토큰 조회 후 계정 정보 가져오기
      const { code, domain } = body;
      if (!code || !domain) {
        throw new BadRequestException("카카오 정보가 없습니다.");
      }
      const kakao = await this.authService.kakaoLogin({ code, domain });

      console.log(`kakaoUserInfo : ${JSON.stringify(kakao)}`);
      if (!kakao.id) {
        throw new BadRequestException("카카오 정보가 없습니다.");
      }

      res.send({
        user: kakao,
        message: "success",
      });
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  @Get("kakao") //구글 로그인 후 콜백 실행 후 콜백 실행 후 이동 시 실행되는 라이터 메서드
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }
}
