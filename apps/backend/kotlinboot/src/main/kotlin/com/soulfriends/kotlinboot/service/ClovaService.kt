package com.soulfriends.kotlinboot.service

import com.fasterxml.jackson.databind.ObjectMapper
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.IOException

@Service
class ClovaService(
    private val objectMapper: ObjectMapper
) {
    private val logger = LoggerFactory.getLogger(this::class.java)

    @Value("\${clova.api.key}")
    private lateinit var apiKey: String

    @Value("\${clova.api.gateway.key}")
    private lateinit var gatewayKey: String

    @Value("\${clova.api.request.id}")
    private lateinit var requestId: String

    @Value("\${clova.api.url}")
    private lateinit var apiUrl: String

    private val client = OkHttpClient()

    data class ClovaResponse(
        val status: Status,
        val result: Result
    ) {
        data class Status(
            val code: String,
            val message: String
        )

        data class Result(
            val message: Message,
            val id: String? = null,
            val model: String? = null,
            val maxTokens: Int? = null,
            val temperature: Double? = null
        )

        data class Message(
            val role: String,
            val content: String
        )
    }

    fun generateText(prompt: String): String {
        return try {
            val request = createRequest(prompt)
            val response = executeRequest(request)
            response.result.message.content
        } catch (e: Exception) {
            logger.error("Error generating text: ${e.message}", e)
            "죄송합니다. 응답을 생성하는 중에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        }
    }

    private fun createRequest(prompt: String): Request {
        val requestBody = """
            {
                "messages": [
                    {
                        "role": "user",
                        "content": "$prompt"
                    }
                ],
                "topP": 0.8,
                "topK": 0,
                "maxTokens": 256,
                "temperature": 0.5,
                "repeatPenalty": 5.0,
                "stopBefore": [],
                "includeAiFilters": true
            }
        """.trimIndent()

        return Request.Builder()
            .url(apiUrl)
            .post(requestBody.toRequestBody("application/json".toMediaTypeOrNull()))
            .addHeader("X-NCP-CLOVASTUDIO-API-KEY", apiKey)
            .addHeader("X-NCP-APIGW-API-KEY", gatewayKey)
            .addHeader("X-NCP-CLOVASTUDIO-REQUEST-ID", requestId)
            .addHeader("Content-Type", "application/json")
            .build()
    }

    private fun executeRequest(request: Request): ClovaResponse {
        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw IOException("Unexpected code $response")

            val responseBody = response.body?.string()
                ?: throw IOException("Empty response body")

            return objectMapper.readValue(responseBody, ClovaResponse::class.java)
        }
    }
}