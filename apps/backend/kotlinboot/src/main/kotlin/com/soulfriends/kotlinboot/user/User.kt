package com.soulfriends.kotlinboot.user

import com.soulfriends.kotlinboot.diary.Diary
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true)
    var userName: String? = null,

    @Column(unique = true, nullable = false)
    val email: String,

    @Column(name = "provider_id")
    val providerId: String,

    @Column(nullable = false)
    val provider: String,

    @Column(name = "create_dt")
    val createDt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "refresh_token")
    var refreshToken: String? = null,

    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], orphanRemoval = true)
    val diaries: MutableList<Diary> = mutableListOf()
)

