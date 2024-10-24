import { JwtGuard } from "@/auth/auth.guard"
import { UpdateUserDto, UserDto } from "@/user/user.dto"
import { User } from "@/user/user.entity"
import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"

import { UserService } from "./user.service"

@ApiTags("Users") // 스웨거 문서에서 그룹화
@Controller("v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "사용자명 중복 확인" })
  @ApiQuery({
    name: "username",
    required: true,
    description: "확인하고자 하는 사용자명",
  })
  @ApiResponse({
    status: 200,
    description: "사용자명 사용 가능 여부 반환",
    schema: {
      type: "object",
      properties: {
        available: {
          type: "boolean",
          description: "사용 가능 여부",
        },
      },
    },
  })
  @Get()
  async checkUsername(@Query("username") username: string) {
    const isAvailable = this.userService.checkNickname(username)
    return { available: isAvailable }
  }

  @ApiOperation({ summary: "현재 사용자 정보 업데이트" })
  @ApiBearerAuth("JWT-auth") // JWT 인증 필요 표시
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "사용자 정보 업데이트 성공",
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 401,
    description: "인증되지 않은 사용자",
  })
  @Put("me")
  @UseGuards(JwtGuard)
  updateNickname(@Request() req, @Body() userData: UpdateUserDto) {
    return this.userService.updateNickname(req.user.id, userData)
  }

  @ApiOperation({ summary: "현재 사용자 정보 조회" })
  @ApiBearerAuth("JWT-auth")
  @ApiResponse({
    status: 200,
    description: "현재 사용자 정보",
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: "인증되지 않은 사용자",
  })
  @Get("me")
  @UseGuards(JwtGuard)
  getUserInfo(@Request() req) {
    const user: User = req.user
    return new UserDto(user)
  }
}
