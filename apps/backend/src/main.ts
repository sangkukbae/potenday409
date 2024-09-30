import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as session from "express-session";
import * as passport from "passport";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: "very-important-secret", //세션 암호화에서 사용되는 키
      resave: false, //세션을 항상 저장할지 여부
      saveUninitialized: false, //세션이 저장되기 전 빈 값을 저장할지 여부
      cookie: { maxAge: 3600000 }, //1시간
    })
  );
  //passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());
  app.useStaticAssets(join(__dirname, "..", "static"));
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  await app.listen(process.env.PORT, () => {});
}
bootstrap();
