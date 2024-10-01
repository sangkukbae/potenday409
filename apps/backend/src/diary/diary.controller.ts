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
} from "@nestjs/common"

import { DiaryService } from "./diary.service"

@Controller("diary")
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  createDiary(@Body() diaryData: CreateDiaryDto) {
    return this.diaryService.createDiary(diaryData)
  }

  @Patch(":id")
  updateDiary(@Param("id") id: number, @Body() updateData: UpdateDiaryDto) {
    return this.diaryService.updateDiary(id, updateData)
  }

  @Delete(":id")
  deleteDiary(@Param("id") id: number) {
    return this.diaryService.deleteDiary(id)
  }

  @Get(":userId")
  async findDiary(
    @Param("userId") userId: number,
    @Query("sort") sort: string, // sort 쿼리 파라미터 (recent, old, like 가능)
    @Query("limit") limit: number = 15
  ) {
    const sortArray = sort ? sort.split(",") : ["recent"]
    const result = await this.diaryService.find(userId, sortArray, limit)
    console.log(result)
    return result
  }

  @Get(":userId/multiple")
  findMultiple(
    @Param("userId") userId: number,
    @Query("year") year: number,
    @Query("month") month: number
  ) {
    return this.diaryService.findMultiple({ userId, year, month })
  }
}
