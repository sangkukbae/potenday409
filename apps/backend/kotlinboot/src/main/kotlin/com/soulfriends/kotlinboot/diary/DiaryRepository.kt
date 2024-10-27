package com.soulfriends.kotlinboot.diary

import com.soulfriends.kotlinboot.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface DiaryRepository : JpaRepository<Diary, Long> {
    fun findByUserId(user: User): List<Diary>
    fun findByUserAndCreateDtBetween(user: User, start: LocalDateTime, end: LocalDateTime): List<Diary>
}
