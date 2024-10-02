import { JwtGuard } from "@/auth/auth.guard"
import { UpdateUserDto } from "@/user/user.dto"
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common"

import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put("nickname/:id")
  updateNickname(@Param("id") id: number, @Body() userData: UpdateUserDto) {
    return this.userService.updateNickname(id, userData)
  }

  @Get("info")
  @UseGuards(JwtGuard)
  getUserInfo(@Request() req) {
    return req.user
  }
}
