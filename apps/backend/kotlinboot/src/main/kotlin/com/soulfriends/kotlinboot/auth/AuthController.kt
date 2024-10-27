package com.soulfriends.kotlinboot.auth

import com.soulfriends.kotlinboot.user.UserService
import com.soulfriends.kotlinboot.util.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.web.bind.annotation.*
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "인증 관련 API")
class AuthController(
    private val userService: UserService,
    private val jwtUtil: JwtUtil
) {

    @Operation(summary = "OAuth 로그인 시작", description = "지정된 provider의 OAuth 인증 페이지로 리다이렉트합니다.")
    @PostMapping("/login")
    fun login(@RequestBody request: Map<String, String>): ResponseEntity<Map<String, String>> {
        val provider = request["provider"] ?: return ResponseEntity.badRequest().build()
        val redirectUrl = when (provider) {
            "google" -> "/oauth2/authorization/google"
            "kakao" -> "/oauth2/authorization/kakao"
            else -> return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok(mapOf("redirectUrl" to redirectUrl))
    }

    @Operation(summary = "OAuth 콜백 처리", description = "OAuth 인증 후 콜백을 처리하고 토큰을 발급합니다.")
    @PostMapping("/oauth2/callback")
    fun oauthCallback(@RequestBody callbackData: Map<String, String>, authentication: OAuth2AuthenticationToken): ResponseEntity<Map<String, String>> {
        val customOAuth2User = authentication.principal as CustomOAuth2User
        val user = customOAuth2User.user
        val token = jwtUtil.generateToken(user)
        
        return ResponseEntity.ok(mapOf(
            "accessToken" to token,
            "userId" to user.id.toString(),
            "userName" to (user.userName ?: "")
        ))
    }

    @Operation(summary = "토큰 갱신", description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.")
    @PostMapping("/refresh")
    fun refreshToken(@RequestBody refreshTokenRequest: RefreshTokenRequest): ResponseEntity<Map<String, String>> {
        val user = userService.findUserByRefreshToken(refreshTokenRequest.refreshToken)
            ?: return ResponseEntity.badRequest().body(mapOf("error" to "Invalid refresh token"))
        
        val newAccessToken = jwtUtil.generateToken(user)
        return ResponseEntity.ok(mapOf("accessToken" to newAccessToken))
    }
}

data class RefreshTokenRequest(val refreshToken: String)
