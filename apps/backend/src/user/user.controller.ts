import { UpdateUserDto } from "@/user/user.dto"
import { Body, Controller, Param, Put } from "@nestjs/common"

import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put("nickname/:id")
  updateNickname(@Param("id") id: number, @Body() userData: UpdateUserDto) {
    return this.userService.updateNickname(id, userData)
  }
}
