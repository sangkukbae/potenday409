import { JwtGuard } from "@/auth/auth.guard"
import { AuthService } from "@/auth/auth.service"
import { UpdateUserDto } from "@/user/user.dto"
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common"

import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Put("nickname/:id")
  updateNickname(@Param("id") id: number, @Body() userData: UpdateUserDto) {
    return this.userService.updateNickname(id, userData)
  }

  @Get("info")
  @UseGuards(JwtGuard)
  getUserInfo(@Request() req) {
    return req.user
  }

  @Post("token-refresh")
  @UseGuards(JwtGuard)
  async postTokenRefresh(@Headers("authorization") authorization: string) {
    const refresh_token = authorization.replace("Bearer ", "")
    return this.authService.refreshAccessToken(refresh_token)
  }
}
