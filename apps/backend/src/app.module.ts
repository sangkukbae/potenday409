import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import * as process from "process";

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
      entities: [User], // 엔티티 경로
      synchronize: true, // 개발 중에는 true로 설정, 프로덕션에서는 false로 설정
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
