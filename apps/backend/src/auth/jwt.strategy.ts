import * as process from "process"
import { JwtPayload } from "@/auth/auth.controller"
import { User } from "@/user/user.entity"
import { UserService } from "@/user/user.service"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // 비밀 키
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.getUserById(payload.id)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
