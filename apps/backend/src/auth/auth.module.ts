import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"

import { UserModule } from "../user/user.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { SessionSerializer } from "./session.serializer"

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [
    AuthService,
    SessionSerializer /*, GoogleStrategy, KakaoStrategy*/,
  ], //API키 입력전에 주석처리
  controllers: [AuthController],
})
export class AuthModule {}
