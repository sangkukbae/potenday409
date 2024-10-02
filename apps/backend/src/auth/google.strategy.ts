import * as process from "process"
import { UserService } from "@/user/user.service"
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-google-oauth20"
import { User } from "src/user/user.entity"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
      accessType: "offline",
      prompt: "consent",
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, name, emails } = profile
    console.log("accessToken : " + accessToken)
    console.log("refreshToken : " + refreshToken)

    const providerId = id
    const email = emails[0].value

    // 유저 정보 저장 혹은 가져오기
    const user: User = await this.userService.findByEmailOrSave(
      email,
      name.familyName + name.givenName,
      providerId,
      "google"
    )
    return user
  }
}
