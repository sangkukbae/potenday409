import { DiaryDto } from "@/diary/dirary.dto"
import { User } from "@/user/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class UserDto {
  @ApiProperty({ description: "사용자 ID" })
  id: number

  @ApiProperty({ description: "사용자명" })
  user_name: string

  @ApiProperty({ description: "이메일" })
  email: string

  @ApiProperty({ description: "소셜 로그인 ID" })
  provider_id: string

  @ApiProperty({ description: "소셜 로그인 제공자" })
  provider: string

  @ApiProperty({
    description: "사용자 생성 날짜",
    type: String,
    format: "date-time",
  })
  create_dt: Date

  @ApiProperty({ description: "리프레시 토큰 (nullable)", nullable: true })
  refresh_token: string

  @ApiProperty({ description: "사용자의 일기 목록", type: () => DiaryDto }) // 다이어리의 DTO를 여기에 추가할 수 있습니다.
  diaries: DiaryDto[]

  constructor(user: User) {
    this.id = user.id
    this.user_name = user.user_name
    this.email = user.email
    this.provider_id = user.provider_id // 소셜 로그인 ID
    this.provider = user.provider // 소셜 로그인 제공자
    this.create_dt = user.create_dt
    this.refresh_token = user.refresh_token

    // diaries 정보를 매핑할 필요가 있을 경우 DiaryDto로 변환
    this.diaries = user.diaries
      ? user.diaries.map((diary) => new DiaryDto(diary))
      : [] // DiaryDto 배열
  }
}

export class CreateUserDto {
  @ApiProperty({
    description: "사용자의 이메일 주소",
    example: "user@example.com",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "소셜 로그인 시 사용되는 사용자 ID",
    example: "1234567890",
  })
  @IsString()
  provider_id: string

  @ApiProperty({
    description: "소셜 로그인 제공자",
    example: "google",
  })
  @IsString()
  provider: string
}

export class UpdateUserDto {
  @ApiProperty({
    description: "사용자명",
    example: "닉네임",
  })
  @IsString()
  username: string
}
