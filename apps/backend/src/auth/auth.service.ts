import * as process from "process"
import { JwtPayload } from "@/auth/auth.controller"
import { User } from "@/user/user.entity" // User 엔티티를 임포트

import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async googleLogin(user: User): Promise<string> {
    return this.generateToken(user)
  }

  async kakaoLogin(user: User): Promise<string> {
    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      user_name: user.user_name,
    }

    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      })
      return decoded // 유효한 경우, 디코딩된 페이로드 반환
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
