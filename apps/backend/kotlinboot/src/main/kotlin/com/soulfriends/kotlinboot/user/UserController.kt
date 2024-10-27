package com.soulfriends.kotlinboot.user

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "사용자 관련 API")
class UserController(private val userService: UserService) {

    @Operation(summary = "사용자 정보 조회", description = "사용자 ID로 사용자 정보를 조회합니다.")
    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): ResponseEntity<User> {
        val user = userService.getUserById(id)
        return if (user != null) {
            ResponseEntity.ok(user)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @Operation(summary = "닉네임 중복 확인", description = "입력된 닉네임의 사용 가능 여부를 확인합니다.")
    @GetMapping("/check-nickname")
    fun checkNickname(@RequestParam userName: String): ResponseEntity<Map<String, Boolean>> {
        val isAvailable = userService.checkNickname(userName)
        return ResponseEntity.ok(mapOf("available" to isAvailable))
    }

    @Operation(summary = "닉네임 업데이트", description = "사용자의 닉네임을 업데이트합니다.")
    @PatchMapping("/{id}/nickname")
    fun updateNickname(@PathVariable id: Long, @RequestBody request: Map<String, String>): ResponseEntity<Map<String, String>> {
        val userName = request["userName"] ?: return ResponseEntity.badRequest().build()
        val updatedUser = userService.updateNickname(id, userName)
        return if (updatedUser != null) {
            ResponseEntity.ok(mapOf("message" to "닉네임이 성공적으로 업데이트되었습니다."))
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
