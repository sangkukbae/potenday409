package com.soulfriends.kotlinboot.user

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
    fun findByUserName(userName: String): User?
    fun findByRefreshToken(refreshToken: String): User?
}

