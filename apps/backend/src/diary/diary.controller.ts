import { JwtGuard } from "@/auth/auth.guard"
import { CreateDiaryDto, UpdateDiaryDto } from "@/diary/dirary.dto"
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common"

import { DiaryService } from "./diary.service"

@Controller("diary")
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get("date")
  @UseGuards(JwtGuard)
  async getDiaryByDate(
    @Request() req,
    @Query("year") year: number,
    @Query("month") month: number,
    @Query("day") day: number
  ) {
    return await this.diaryService.getDiaryByDate(req.user.id, year, month, day)
  }

  @Get(":id")
  async getDiary(@Param("id") id: number) {
    return await this.diaryService.getDiary(id)
  }

  @Post()
  @UseGuards(JwtGuard)
  createDiary(@Request() req, @Body() diaryData: CreateDiaryDto) {
    return this.diaryService.createDiary(req.user.id, diaryData)
  }

  @Patch(":id")
  updateDiary(@Param("id") id: number, @Body() updateData: UpdateDiaryDto) {
    return this.diaryService.updateDiary(id, updateData)
  }

  @Delete(":id")
  deleteDiary(@Param("id") id: number) {
    return this.diaryService.deleteDiary(id)
  }

  @Get()
  @UseGuards(JwtGuard)
  async findDiary(
    @Request() req,
    @Query("sort") sort: string, // sort 쿼리 파라미터 (recent, old, like 가능)
    @Query("limit") limit: number,
    @Query("page") page: number
  ) {
    const sortArray = sort ? sort.split(",") : ["recent"]
    const result = await this.diaryService.find(
      req.user.id,
      sortArray,
      limit,
      page
    )
    return result
  }

  @Get("multiple")
  @UseGuards(JwtGuard)
  findMultiple(
    @Request() req,
    @Query("year") year: number,
    @Query("month") month: number
  ) {
    return this.diaryService.findMultiple({ userId: req.user.id, year, month })
  }

  @Patch(":id/update-heart")
  updateDiaryHeart(@Param("id") id: number, @Query("heart") heart: number) {
    return this.diaryService.updateDiaryHeart(id, heart)
  }
}
