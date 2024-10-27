package com.soulfriends.kotlinboot.diary

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/v1/diaries")
@Tag(name = "Diaries", description = "일기 관련 API")
class DiaryController(private val diaryService: DiaryService) {

    @Operation(summary = "일기 작성", description = "새로운 일기를 작성하고 AI 분석 결과를 반환합니다.")
    @PostMapping
    fun createDiary(@RequestBody request: CreateDiaryRequest): ResponseEntity<DiaryResponse> {
        val diary = diaryService.createDiary(request.userId, request.title, request.character, request.content)
        val response = DiaryResponse(
            id = diary.id,
            title = diary.title,
            character = diary.character,
            content = diary.content,
            emotion = diary.emotion,
            musicUrl = diary.musicUrl,
            musicName = diary.musicName,
            replyContent = diary.replyContent,
            createDt = diary.createDt
        )
        return ResponseEntity.status(HttpStatus.CREATED).body(response)
    }

    @Operation(summary = "사용자의 일기 목록 조회", description = "특정 사용자의 모든 일기를 조회합니다.")
    @GetMapping("/users/{userId}/diaries")
    fun getDiariesByUserId(@PathVariable userId: Long): ResponseEntity<List<Diary>> {
        val diaries = diaryService.getDiariesByUserId(userId)
        return ResponseEntity.ok(diaries)
    }

    @Operation(summary = "특정 기간 일기 조회", description = "특정 사용자의 지정된 기간 내 일기를 조회합니다.")
    @GetMapping("/users/{userId}/diaries/range")
    fun getDiariesByUserIdAndDateRange(
        @PathVariable userId: Long,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) start: LocalDateTime,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) end: LocalDateTime
    ): ResponseEntity<List<Diary>> {
        val diaries = diaryService.getDiariesByUserIdAndDateRange(userId, start, end)
        return ResponseEntity.ok(diaries)
    }

    @Operation(summary = "일기 내용 수정", description = "특정 일기의 내용을 수정합니다.")
    @PatchMapping("/{id}/content")
    fun updateDiaryContent(@PathVariable id: Long, @RequestBody request: UpdateDiaryContentRequest): ResponseEntity<Diary> {
        val updatedDiary = diaryService.updateDiaryContent(id, request.content)
        return ResponseEntity.ok(updatedDiary)
    }

    @Operation(summary = "일기 삭제", description = "특정 일기를 삭제합니다.")
    @DeleteMapping("/{id}")
    fun deleteDiary(@PathVariable id: Long): ResponseEntity<Void> {
        diaryService.deleteDiary(id)
        return ResponseEntity.noContent().build()
    }
}

data class CreateDiaryRequest(val userId: Long, val title: String, val character: String, val content: String)
data class UpdateDiaryContentRequest(val content: String)

data class DiaryResponse(
    val id: Long,
    val title: String,
    val character: String,
    val content: String,
    val emotion: String?,
    val musicUrl: String?,
    val musicName: String?,
    val replyContent: String?,
    val createDt: LocalDateTime
)
