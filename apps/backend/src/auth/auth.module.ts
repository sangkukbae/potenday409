import { GoogleStrategy } from "@/auth/google.strategy"
import { KakaoStrategy } from "@/auth/kakao.strategy"
import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"

import { UserModule } from "../user/user.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { SessionSerializer } from "./session.serializer"

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, SessionSerializer, GoogleStrategy, KakaoStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
