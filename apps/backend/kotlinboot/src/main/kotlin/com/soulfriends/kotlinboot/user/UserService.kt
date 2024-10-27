package com.soulfriends.kotlinboot.user

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(private val userRepository: UserRepository) {

    @Transactional
    fun createUser(email: String, providerId: String, provider: String): User {
        return userRepository.save(User(email = email, providerId = providerId, provider = provider))
    }

    fun getUserByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun getUserById(id: Long): User? {
        return userRepository.findById(id).orElse(null)
    }

    @Transactional
    fun findByEmailOrSave(email: String, providerId: String, provider: String): User {
        return getUserByEmail(email) ?: createUser(email, providerId, provider)
    }

    fun checkNickname(userName: String): Boolean {
        return userRepository.findByUserName(userName) == null
    }

    @Transactional
    fun updateNickname(id: Long, userName: String): User? {
        val user = getUserById(id) ?: return null
        user.userName = userName
        return userRepository.save(user)
    }

    fun findUserByRefreshToken(refreshToken: String): User? {
        return userRepository.findByRefreshToken(refreshToken)
    }
}
