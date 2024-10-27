package com.soulfriends.kotlinboot.config

import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder

@Configuration
class JwtConfig {

    @Value("\${jwt.secret}")
    private lateinit var jwtSecret: String

    @Bean
    fun jwtDecoder(): JwtDecoder {
        val secretKey = Jwts.SIG.HS512.key().build()  // 안전한 키 생성
        return NimbusJwtDecoder.withSecretKey(secretKey).build()
    }
}