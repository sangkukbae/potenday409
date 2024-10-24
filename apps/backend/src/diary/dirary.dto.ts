import { Diary } from "@/diary/diary.entity"
import { UserDto } from "@/user/user.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator"

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
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  character: string

  @IsNotEmpty()
  year: number

  @IsNotEmpty()
  month: number

  @IsNotEmpty()
  day: number
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
    minimum: 0,
    maximum: 1,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsNotEmpty({ message: "하트 상태를 지정해주세요." })
  heart: number
}

export class DiaryResponseDto {
  @ApiProperty()
  status: number

  @ApiProperty()
  message: string

  @ApiProperty({ type: DiaryDto })
  data: DiaryDto

  @ApiProperty({
    type: "object",
    properties: {
      pagination: {
        type: "object",
        properties: {
          total: { type: "number" },
          page: { type: "number" },
          limit: { type: "number" },
        },
      },
    },
    required: false,
  })
  metadata?: {
    pagination?: {
      total: number
      page: number
      limit: number
    }
  }
}
