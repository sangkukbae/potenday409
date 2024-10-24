import * as process from "process"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as session from "express-session"
import * as passport from "passport"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix("api")
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
  const options = new DocumentBuilder()
    .setTitle("SoulFriends API Docs")
    .setDescription("SoulFriends API description")
    .setVersion("1.0.0")
    .addBearerAuth(
      {
        // OAuth2 또는 JWT 토큰 설정을 위한 구성 객체
        type: "http", // 인증 타입 (http, apiKey, oauth2, openIdConnect)
        scheme: "bearer", // 인증 스키마 (bearer, basic 등)
        bearerFormat: "JWT", // 토큰 포맷 (JWT, OAuth 등)
        name: "JWT", // Swagger UI에 표시될 이름
        description: "Enter JWT token", // Swagger UI에 표시될 설명
        in: "header", // 토큰이 전달될 위치 (header, query, cookie)
      },
      "JWT-auth" // 보안 스키마의 키 (컨트롤러의 @ApiBearerAuth()와 매칭)
    )
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api-docs", app, document)

  await app.listen(process.env.PORT, () => {})
}
bootstrap()
