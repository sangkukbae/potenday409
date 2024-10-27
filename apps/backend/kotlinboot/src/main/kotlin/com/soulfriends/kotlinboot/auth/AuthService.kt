package com.soulfriends.kotlinboot.auth

import com.soulfriends.kotlinboot.user.User
import com.soulfriends.kotlinboot.user.UserService
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service

@Service
class AuthService(private val userService: UserService) : DefaultOAuth2UserService() {

    override fun loadUser(userRequest: OAuth2UserRequest): OAuth2User {
        val oauth2User = super.loadUser(userRequest)
        val email = oauth2User.attributes["email"] as String
        val providerId = oauth2User.attributes["sub"] as String
        val provider = userRequest.clientRegistration.registrationId

        val user = userService.findByEmailOrSave(email, providerId, provider)
        return CustomOAuth2User(oauth2User, user)
    }
}

class CustomOAuth2User(
    private val oauth2User: OAuth2User,
    val user: User
) : OAuth2User by oauth2User

