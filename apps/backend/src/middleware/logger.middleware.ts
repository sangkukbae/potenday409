import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req
    const timestamp = new Date().toISOString()

    console.log(`[${timestamp}] ${method} ${originalUrl}`)

    const originalSend = res.send.bind(res)

    res.send = (body) => {
      // 응답 본문이 문자열일 경우에만 JSON.parse 가능
      if (typeof body === "string") {
        try {
          const responseBody = JSON.parse(body)
          res.on("finish", () => {
            const responseTime = new Date().toISOString()
            const statusCode = res.statusCode
            console.log(
              `[${responseTime}] ${method} ${originalUrl} - Status: ${statusCode} - Response:`,
              responseBody
            )
          })
        } catch (e) {
          res.on("finish", () => {
            const responseTime = new Date().toISOString()
            const statusCode = res.statusCode
            console.log(
              `[${responseTime}] ${method} ${originalUrl} - Status: ${statusCode} - Response:`,
              body
            )
            // JSON 파싱 실패 시 처리
            console.log(`[Error] : ${e}`)
          })
        }
      } else {
        res.on("finish", () => {
          const responseTime = new Date().toISOString()
          const statusCode = res.statusCode
          console.log(
            `[${responseTime}] ${method} ${originalUrl} - Status: ${statusCode} - Response:`,
            body
          )
        })
      }

      return originalSend(body)
    }

    next()
  }
}
