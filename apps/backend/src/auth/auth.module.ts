import { GoogleStrategy } from "@/auth/google.strategy"
import { JwtStrategy } from "@/auth/jwt.strategy"
import { KakaoStrategy } from "@/auth/kakao.strategy"
import { UserModule } from "@/user/user.module"
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: false }),
    JwtModule.register({}),
  ],
  providers: [AuthService, GoogleStrategy, KakaoStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
