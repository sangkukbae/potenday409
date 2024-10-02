import * as process from "process"
import { JwtPayload } from "@/auth/auth.controller"
import { User } from "@/user/user.entity" // User 엔티티를 임포트

import { UserService } from "@/user/user.service"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async googleLogin(user: User) {
    return this.generateTokens(user)
  }

  async kakaoLogin(user: User) {
    return this.generateTokens(user)
  }

  private async generateTokens(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      user_name: user.user_name,
    }

    const accessToken = this.generateAccessToken(payload)
    const refreshToken = this.generateRefreshToken(payload)
    await this.userService.setRefreshToken(user.id, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  private generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: "1h",
    })
  }

  private generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: "1d",
    })
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findUserByRefreshToken(refreshToken)

    if (!user) {
      throw new UnauthorizedException("Invalid refresh token")
    }

    return await this.generateTokens(user)
  }
}
