import { Diary } from "@/diary/diary.entity"
import { UserDto } from "@/user/user.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from "class-validator"

export class DiaryDto {
  @ApiProperty({ description: "일기 ID" })
  id: number

  @ApiProperty({ description: "작성자 사용자 정보", type: () => UserDto })
  user: UserDto // 사용자의 정보를 포함할 경우

  @ApiProperty({ description: "일기 제목" })
  title: string

  @ApiProperty({ description: "캐릭터" })
  character: string

  @ApiProperty({ description: "일기 내용" })
  content: string

  @ApiProperty({ description: "음악 URL", nullable: true })
  music_url: string

  @ApiProperty({ description: "감정", nullable: true })
  emotion: string

  @ApiProperty({ description: "답글 내용", nullable: true })
  reply_content: string

  @ApiProperty({ description: "하트 여부 (0: 없음, 1: 있음)", nullable: true })
  heart: number

  @ApiProperty({ description: "작성 날짜", type: String, format: "date-time" })
  create_dt: Date

  @ApiProperty({
    description: "수정 날짜",
    type: String,
    format: "date-time",
    nullable: true,
  })
  update_dt: Date

  @ApiProperty({ description: "음악 이름", nullable: true })
  music_name: string

  @ApiProperty({ description: "저장 날짜", type: String, format: "date-time" })
  save_dt: Date

  constructor(diary: Diary) {
    this.id = diary.id
    this.title = diary.title
    this.content = diary.content
    this.music_url = diary.music_url
    this.emotion = diary.emotion
    this.heart = diary.heart
    this.create_dt = diary.create_dt
  }
}

export class CreateDiaryDto {
  @ApiProperty({
    description: "일기 제목",
    example: "오늘의 일기",
  })
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: "일기 내용",
    example: "오늘은 날씨가 좋았다...",
  })
  @IsNotEmpty()
  content: string

  @ApiProperty({
    description: "캐릭터 종류",
    example: "단짝이",
  })
  @IsNotEmpty()
  character: string

  @ApiProperty({
    description: "일기 작성 날짜",
    example: "2024-10-25",
    type: String,
  })
  @IsNotEmpty()
  @IsDateString()
  date: string
}

export class UpdateDiaryContentDto {
  @ApiProperty({
    description: "일기 내용",
    example: "오늘은 정말 좋은 하루였다...",
  })
  @IsNotEmpty({ message: "내용을 입력해주세요." })
  content: string
}

export class UpdateDiaryHeartDto {
  @ApiProperty({
    description: "하트 상태 (0: 없음, 1: 있음)",
    example: 1,
    enum: [0, 1],
  })
  @IsNumber()
  @IsEnum([0, 1], { message: "하트 상태는 0 또는 1이어야 합니다." })
  @IsNotEmpty({ message: "하트 상태를 지정해주세요." })
  heart: number
}
