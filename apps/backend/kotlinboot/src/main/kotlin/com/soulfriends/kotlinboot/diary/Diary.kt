package com.soulfriends.kotlinboot.diary

import com.soulfriends.kotlinboot.user.User
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "diary")
data class Diary(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User,
    
    @Column(nullable = false, length = 45)
    var title: String,

    @Column(name = "`character`", nullable = false, length = 15)
    var character: String,
    
    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    var content: String,
    
    @Column(nullable = true, length = 45)
    var musicUrl: String? = null,
    
    @Column(nullable = true, length = 45)
    var emotion: String? = null,
    
    @Column(nullable = true, columnDefinition = "MEDIUMTEXT")
    var replyContent: String? = null,
    
    @Column(nullable = true)
    var heart: Int = 0,
    
    @Column(nullable = false)
    val createDt: LocalDateTime = LocalDateTime.now(),
    
    @Column(nullable = true)
    var updateDt: LocalDateTime? = null,
    
    @Column(nullable = true, length = 45)
    var musicName: String? = null,
    
    @Column(nullable = false)
    var saveDt: LocalDateTime = LocalDateTime.now()
)
