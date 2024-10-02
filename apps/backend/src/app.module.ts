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
      host: process.env.DB_HOST, // MySQL 호스트
      port: Number(process.env.DB_PORT), // 기본 MySQL 포트
      username: process.env.DB_USERNAME, // MySQL 사용자 이름
      password: process.env.DB_PASSWORD, // MySQL 비밀번호
      database: process.env.DB_NAME, // 사용할 데이터베이스 이름
      entities: [User, Diary], // 엔티티 경로
      synchronize: true, // 개발 중에는 true로 설정, 프로덕션에서는 false로 설정
      logging: true, //쿼리 로그출력
    }),
    TypeOrmModule.forFeature([Diary]),
    AuthModule,
    UserModule,
    DiaryModule,
    YoutubeModule,
    HttpModule,
  ],
  controllers: [AppController, DiaryController, YoutubeController],
  providers: [AppService, DiaryService, YoutubeService],
})
export class AppModule {}
