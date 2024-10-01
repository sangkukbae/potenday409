import { UserModule } from "@/user/user.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { DiaryController } from "./diary.controller"
import { Diary } from "./diary.entity"
import { DiaryService } from "./diary.service"

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Diary])],
  providers: [DiaryService],
  controllers: [DiaryController],
  exports: [DiaryService],
})
export class DiaryModule {}
