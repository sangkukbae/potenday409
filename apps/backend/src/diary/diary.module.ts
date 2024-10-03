import { ClovaService } from "@/clova/clova.service"
import { UserModule } from "@/user/user.module"
import { YoutubeService } from "@/youtube/youtube.service"
import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { DiaryController } from "./diary.controller"
import { Diary } from "./diary.entity"
import { DiaryService } from "./diary.service"

@Module({
  imports: [UserModule, HttpModule, TypeOrmModule.forFeature([Diary])],
  providers: [DiaryService, ClovaService, YoutubeService],
  controllers: [DiaryController],
  exports: [DiaryService],
})
export class DiaryModule {}
