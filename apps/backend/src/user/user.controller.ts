import { Controller } from "@nestjs/common"

import { UserService } from "./user.service"

@Controller("user") //주소가 user로 시작됨
export class UserController {
  constructor(private userService: UserService) {} //유저 서비스 주입
}
