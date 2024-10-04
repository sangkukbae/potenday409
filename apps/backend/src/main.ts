import * as process from "process"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import * as session from "express-session"
import * as passport from "passport"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    session({
      secret: "very-important-secret", //세션 암호화에서 사용되는 키
      resave: false, //세션을 항상 저장할지 여부
      saveUninitialized: false, //세션이 저장되기 전 빈 값을 저장할지 여부
      cookie: { maxAge: 3600000 }, //1시간
    })
  )
  //passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT, () => {})
}
bootstrap()
