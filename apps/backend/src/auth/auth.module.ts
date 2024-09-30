import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from "./session.serializer";
import { GoogleStrategy } from "./google.strategy";
import { KakaoStrategy } from "./kakao.strategy";

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, SessionSerializer /*, GoogleStrategy, KakaoStrategy*/], //API키 입력전에 주석처리
  controllers: [AuthController],
})
export class AuthModule {}
