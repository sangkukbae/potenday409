package com.soulfriends.kotlinboot.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.oauth2.jwt.JwtDecoder

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtDecoder: JwtDecoder,
    @Value("\${swagger.user}") private val swaggerUser: String,
    @Value("\${swagger.password}") private val swaggerPassword: String
) {

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun userDetailsService(): InMemoryUserDetailsManager {
        val user: UserDetails = User.builder()
            .username(swaggerUser)
            .password(passwordEncoder().encode(swaggerPassword))
            .roles("SWAGGER")
            .build()
        return InMemoryUserDetailsManager(user)
    }

    @Bean
    @Order(1)
    fun swaggerSecurityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .securityMatchers { matchers ->
                matchers
                    .requestMatchers(
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/v3/api-docs/**",
                        "/api-docs/**"
                    )
            }
            .authorizeHttpRequests { auth ->
                auth.anyRequest().hasRole("SWAGGER")
            }
            .csrf { it.disable() }
            .sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .httpBasic {}

        return http.build()
    }

    @Bean
    @Order(2)
    fun apiSecurityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .securityMatchers { matchers ->
                matchers.requestMatchers("/api/**")
            }
            .csrf { it.disable() }
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers("/api/v1/auth/**").permitAll()
                    .anyRequest().authenticated()
            }
            .oauth2Login { oauth2 ->
                oauth2
                    .authorizationEndpoint { authorizationEndpoint ->
                        authorizationEndpoint.baseUri("/api/v1/auth/oauth2/authorize")
                    }
                    .redirectionEndpoint { redirectionEndpoint ->
                        redirectionEndpoint.baseUri("/api/v1/auth/oauth2/callback/*")
                    }
            }
            .oauth2ResourceServer { oauth2ResourceServer ->
                oauth2ResourceServer.jwt { jwt ->
                    jwt.decoder(jwtDecoder)
                }
            }
            .sessionManagement { sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }

        return http.build()
    }
}