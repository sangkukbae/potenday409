plugins {
	val kotlinVersion = "1.9.24"
	kotlin("jvm") version kotlinVersion
	kotlin("plugin.spring") version kotlinVersion
	kotlin("plugin.jpa") version kotlinVersion
	id("org.springframework.boot") version "3.2.3"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.soulfriends"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

val openApiVersion = "2.3.0"  // Updated for Spring Boot 3.2.x compatibility
val okhttpVersion = "4.12.0"  // Updated to latest version
val googleApisYoutubeVersion = "v3-rev20240213-2.0.0"  // Updated to latest version
val googleApiClientVersion = "2.3.0"  // Updated to latest version
val googleHttpClientVersion = "1.44.1"  // Updated to latest version

dependencies {
	// Spring Boot
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-aop")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
	implementation("org.springframework.boot:spring-boot-starter-validation")  // Added for Jakarta Validation

	// Kotlin
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

	// Database
	runtimeOnly("com.mysql:mysql-connector-j")

	// OpenAPI Documentation
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:$openApiVersion")

	// Google APIs
	implementation("com.google.apis:google-api-services-youtube:$googleApisYoutubeVersion")
	implementation("com.google.api-client:google-api-client:$googleApiClientVersion")
	implementation("com.google.http-client:google-http-client-gson:$googleHttpClientVersion")

	// HTTP Client
	implementation("com.squareup.okhttp3:okhttp:$okhttpVersion")

	// Development Tools
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	// Lombok (Consider removing if not needed with Kotlin)
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")

	//jwt
	implementation("io.jsonwebtoken:jjwt-api:0.12.5")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.5")

	// Test Dependencies
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
	}
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

kotlin {
	jvmToolchain(21)
}

allOpen {
	annotation("jakarta.persistence.Entity")
	annotation("jakarta.persistence.MappedSuperclass")
	annotation("jakarta.persistence.Embeddable")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "21"
	}
}