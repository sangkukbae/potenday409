package com.soulfriends.kotlinboot.util

import com.soulfriends.kotlinboot.user.User
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtUtil {
    @Value("\${jwt.secret}")
    private lateinit var jwtSecret: String

    @Value("\${jwt.expiration}")
    private lateinit var jwtExpiration: String

    private fun getSigningKey(): SecretKey {
        return Jwts.SIG.HS512.key().build()  // JwtConfig와 같은 방식으로 키 생성
    }

    fun generateToken(user: User): String {
        val now = Date()
        val expiration = Date(now.time + jwtExpiration.toLong())

        return Jwts.builder()
            .subject(user.id.toString())
            .issuedAt(now)
            .expiration(expiration)
            .signWith(getSigningKey(), Jwts.SIG.HS512)  // 알고리즘 명시
            .compact()
    }

    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getUserIdFromToken(token: String): Long? {
        return try {
            val claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .payload
            claims.subject.toLong()
        } catch (e: Exception) {
            null
        }
    }
}