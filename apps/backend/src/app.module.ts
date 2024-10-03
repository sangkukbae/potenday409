import * as process from "process"
import { Diary } from "@/diary/diary.entity"
import { YoutubeController } from "@/youtube/youtube.controller"
import { YoutubeModule } from "@/youtube/youtube.module"
import { YoutubeService } from "@/youtube/youtube.service"
import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { ClovaModule } from "./clova/clova.module"
import { DiaryController } from "./diary/diary.controller"
import { DiaryModule } from "./diary/diary.module"
import { DiaryService } from "./diary/diary.service"
import { User } from "./user/user.entity"
import { UserModule } from "./user/user.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "src/configs/.env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Diary],
      synchronize: true, // 개발 중에는 true로 설정, 프로덕션에서는 false로 설정
      logging: true,
    }),
    TypeOrmModule.forFeature([Diary]),
    AuthModule,
    UserModule,
    DiaryModule,
    YoutubeModule,
    HttpModule,
    ClovaModule,
  ],
  controllers: [AppController, DiaryController, YoutubeController],
  providers: [AppService, DiaryService, YoutubeService],
})
export class AppModule {}
