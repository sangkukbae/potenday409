import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import axios from "axios"
import * as qs from "qs"

import { CreateUserDto } from "../user/user.dto"
import { UserService } from "../user/user.service"

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(userDto: CreateUserDto) {
    // 이미 가입된 유저가 있는지 체크
    const user = await this.userService.getUser(userDto.email)
    if (user) {
      throw new HttpException(
        "해당 유저가 이미 있습니다.",
        HttpStatus.BAD_REQUEST
      )
    }

    //데이터 베이스에 저장. 저장 중 에러가나면 서버 에러 발생
    try {
      const user = await this.userService.createUser({ ...userDto })
      return user
    } catch (e) {
      console.error(e)
      throw new HttpException("서버 에러", 500)
    }
  }

  async kakaoLogin(options: { code: string; domain: string }): Promise<any> {
    const { code, domain } = options
    const kakaoTokenUrl = "https://kauth.kakao.com/oauth/token"
    const kakaoUserInfoUrl = "https://kapi.kakao.com/v2/user/me"
    const body = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_API_KEY,
      redirect_uri: `${domain}/kakao`,
      code,
    }
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    }
    try {
      const response = await axios({
        method: "POST",
        url: kakaoTokenUrl,
        timeout: 30000,
        headers,
        data: qs.stringify(body),
      })
      if (response.status === 200) {
        console.log(`kakaoToken : ${JSON.stringify(response.data)}`)
        // Token 을 가져왔을 경우 사용자 정보 조회
        const headerUserInfo = {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + response.data.access_token,
        }
        console.log(`url : ${kakaoTokenUrl}`)
        console.log(`headers : ${JSON.stringify(headerUserInfo)}`)
        const responseUserInfo = await axios({
          method: "GET",
          url: kakaoUserInfoUrl,
          timeout: 30000,
          headers: headerUserInfo,
        })
        console.log(`responseUserInfo.status : ${responseUserInfo.status}`)
        if (responseUserInfo.status === 200) {
          console.log(
            `kakaoUserInfo : ${JSON.stringify(responseUserInfo.data)}`
          )
          return responseUserInfo.data
        } else {
          throw new UnauthorizedException()
        }
      } else {
        throw new UnauthorizedException()
      }
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException()
    }
  }
}
