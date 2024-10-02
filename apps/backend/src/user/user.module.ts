import { AuthService } from "@/auth/auth.service"
import { Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserController } from "./user.controller"
import { User } from "./user.entity"
import { UserService } from "./user.service"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
