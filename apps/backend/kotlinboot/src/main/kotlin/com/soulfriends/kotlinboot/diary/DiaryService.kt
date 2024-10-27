package com.soulfriends.kotlinboot.diary

import com.soulfriends.kotlinboot.user.UserService
import com.soulfriends.kotlinboot.service.YouTubeService
import com.soulfriends.kotlinboot.service.ClovaService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import org.slf4j.LoggerFactory

@Service
class DiaryService(
    private val diaryRepository: DiaryRepository,
    private val userService: UserService,
    private val youTubeService: YouTubeService,
    private val clovaService: ClovaService
) {
    private val logger = LoggerFactory.getLogger(this::class.java)

    @Transactional
    fun createDiary(userId: Long, title: String, character: String, content: String): Diary {
        val user = userService.getUserById(userId) ?: throw IllegalArgumentException("User not found")
        val emotion = analyzeEmotion(content)
        val musicRecommendation = recommendMusic(emotion)
        val aiResponse = generateAIResponse(content, emotion)

        val diary = Diary(
            user = user,
            title = title,
            character = character,
            content = content,
            emotion = emotion,
            musicUrl = musicRecommendation,
            replyContent = aiResponse,
            createDt = LocalDateTime.now(),
            saveDt = LocalDateTime.now()
        )

        return diaryRepository.save(diary)
    }

    private fun analyzeEmotion(content: String): String {
        val prompt = "다음 일기 내용의 감정을 분석해주세요: $content"
        return clovaService.generateText(prompt)
    }

    private fun recommendMusic(emotion: String): String {
        return when (val result = youTubeService.searchVideos("$emotion music", 1)) {
            is YouTubeService.SearchResult.Success -> {
                result.videos.firstOrNull()?.videoId ?: ""
            }
            is YouTubeService.SearchResult.Error -> {
                logger.error("Failed to recommend music: ${result.message}")
                ""
            }
        }
    }

    private fun generateAIResponse(content: String, emotion: String): String {
        val prompt = "다음 일기 내용에 대해 $emotion 감정을 고려하여 공감적인 답변을 해주세요: $content"
        return clovaService.generateText(prompt)
    }

    fun getDiariesByUserId(userId: Long): List<Diary> {
        val user = userService.getUserById(userId) ?: throw IllegalArgumentException("User not found")
        return diaryRepository.findByUserId(user)
    }

    fun getDiariesByUserIdAndDateRange(userId: Long, start: LocalDateTime, end: LocalDateTime): List<Diary> {
        val user = userService.getUserById(userId) ?: throw IllegalArgumentException("User not found")
        return diaryRepository.findByUserAndCreateDtBetween(user, start, end)
    }

    @Transactional
    fun updateDiaryContent(id: Long, content: String): Diary {
        val diary = diaryRepository.findById(id).orElseThrow { IllegalArgumentException("Diary not found") }
        diary.content = content
        return diaryRepository.save(diary)
    }

    @Transactional
    fun deleteDiary(id: Long) {
        diaryRepository.deleteById(id)
    }
}
