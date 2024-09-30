import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Injectable } from "@nestjs/common";
import * as process from "process";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.KAKAO_API_KEY,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ["profile_nickname"], //'account_email' 일단 빼기
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username /*, emails*/ } = profile;
    console.log("accessToken : " + accessToken);
    console.log("refreshToken : " + refreshToken);

    const providerId = id;
    const email = "test@test.com"; //emails[0].value;

    // 유저 정보 저장 혹은 가져오기
    const user: User = await this.userService.findByEmailOrSave(email, username, providerId);
    return user;
  }
}
