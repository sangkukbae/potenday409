import { JwtGuard } from "@/auth/auth.guard"
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"

import { DiaryService } from "./diary.service"
import {
  CreateDiaryDto,
  DiaryDto,
  UpdateDiaryContentDto,
  UpdateDiaryHeartDto,
} from "./dirary.dto"

@ApiTags("Diaries")
@Controller("v1/diaries")
@UseGuards(JwtGuard)
@ApiBearerAuth("JWT-auth")
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get()
  @ApiOperation({ summary: "일기 목록 조회" })
  @ApiQuery({
    name: "sort",
    required: false,
    description: "정렬 옵션 (recent,old,heart)",
    type: String,
  })
  @ApiQuery({
    name: "page",
    required: false,
    description: "페이지 번호",
    type: Number,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "페이지당 항목 수",
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "일기 목록 조회 성공",
    type: DiaryDto,
    isArray: true,
  })
  async getDiaries(
    @Request() req,
    @Query("sort") sort?: string,
    @Query("limit") limit?: number,
    @Query("page") page?: number
  ) {
    const sortArray = sort ? sort.split(",") : ["recent"]
    return await this.diaryService.find(req.user.id, sortArray, limit, page)
  }

  @Get("by-date")
  @ApiOperation({ summary: "날짜별 일기 조회" })
  @ApiQuery({ name: "year", required: true, type: Number })
  @ApiQuery({ name: "month", required: true, type: Number })
  @ApiQuery({ name: "day", required: true, type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "일기 조회 성공",
    type: DiaryDto,
  })
  async getDiaryByDate(
    @Request() req,
    @Query("year", ParseIntPipe) year: number,
    @Query("month", ParseIntPipe) month: number,
    @Query("day", ParseIntPipe) day: number
  ) {
    return await this.diaryService.getDiaryByDate(req.user.id, year, month, day)
  }

  @Get("monthly")
  @ApiOperation({ summary: "월별 일기 목록 조회" })
  @ApiQuery({ name: "year", required: true, type: Number })
  @ApiQuery({ name: "month", required: true, type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "월별 일기 목록 조회 성공",
    type: DiaryDto,
    isArray: true,
  })
  async getMonthlyDiaries(
    @Request() req,
    @Query("year", ParseIntPipe) year: number,
    @Query("month", ParseIntPipe) month: number
  ) {
    return await this.diaryService.findMultiple({
      userId: req.user.id,
      year,
      month,
    })
  }

  @Get(":id")
  @ApiOperation({ summary: "특정 일기 조회" })
  @ApiParam({ name: "id", required: true, description: "일기 ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "일기 조회 성공",
    type: DiaryDto,
  })
  async getDiary(@Param("id", ParseIntPipe) id: number) {
    return await this.diaryService.getDiary(id)
  }

  @Post()
  @ApiOperation({ summary: "새 일기 작성" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "일기 작성 성공",
    type: DiaryDto,
  })
  async createDiary(@Request() req, @Body() diaryData: CreateDiaryDto) {
    return await this.diaryService.createDiary(req.user.id, diaryData)
  }

  @Patch(":id/content")
  @ApiOperation({ summary: "일기 내용 수정" })
  @ApiParam({ name: "id", required: true, description: "일기 ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "일기 내용 수정 성공",
    type: DiaryDto,
  })
  async updateDiaryContent(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateData: UpdateDiaryContentDto
  ) {
    return await this.diaryService.updateDiaryContent(id, updateData)
  }

  @Patch(":id/heart")
  @ApiOperation({ summary: "일기 하트 상태 수정" })
  @ApiParam({ name: "id", required: true, description: "일기 ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "하트 상태 수정 성공",
    type: DiaryDto,
  })
  async updateDiaryHeart(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateData: UpdateDiaryHeartDto
  ) {
    return await this.diaryService.updateDiaryHeart(id, updateData.heart)
  }

  @Delete(":id")
  @ApiOperation({ summary: "일기 삭제" })
  @ApiParam({ name: "id", required: true, description: "일기 ID" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "일기 삭제 성공" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDiary(@Param("id", ParseIntPipe) id: number) {
    await this.diaryService.deleteDiary(id)
  }
}
