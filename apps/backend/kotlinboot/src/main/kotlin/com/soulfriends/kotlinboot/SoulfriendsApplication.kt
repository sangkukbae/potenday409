package com.soulfriends.kotlinboot

import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SoulfriendsApplication

private val logger = LoggerFactory.getLogger(SoulfriendsApplication::class.java)

fun main(args: Array<String>) {
	runApplication<SoulfriendsApplication>(*args).also {
		val port = it.environment.getProperty("server.port", "8080")
		logger.info("========================================================================")
		logger.info("                SoulFriends 서버 시작이 완료되었습니다!")
		logger.info("                Swagger UI: http://localhost:$port/swagger-ui/index.html")
		logger.info("                API Docs: http://localhost:$port/api-docs")
		logger.info("========================================================================")
	}
}