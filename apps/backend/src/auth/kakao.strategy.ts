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
      scope: ["profile_nickname"],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<User> {
    const { id, username } = profile
    console.log("accessToken : " + accessToken)
    console.log("refreshToken : " + refreshToken)
    console.log("카카오 로그인 시도")

    const providerId = id
    const email = "test@test.com" // 실제 이메일을 가져오려면 주석 해제 후 사용

    // 유저 정보 저장 혹은 가져오기
    const user: User = await this.userService.findByEmailOrSave(
      email,
      username,
      providerId,
      "kakao"
    )

    return user
  }
}
