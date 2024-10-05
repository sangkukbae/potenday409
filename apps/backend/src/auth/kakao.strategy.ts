import * as process from "process"
import { User } from "@/user/user.entity"
import { UserService } from "@/user/user.service"
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy } from "passport-kakao"

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.KAKAO_API_KEY,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ["profile_nickname", "account_email"],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<User> {
    const { id, _raw } = profile
    const email = JSON.parse(_raw)["kakao_account"]["email"]
    console.log("accessToken : " + accessToken)
    console.log("refreshToken : " + refreshToken)

    const providerId = id

    return await this.userService.findByEmailOrSave(email, providerId, "kakao")
  }
}
