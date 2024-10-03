import * as process from "process"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import * as passport from "passport"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  //passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT, () => {})
}
bootstrap()
