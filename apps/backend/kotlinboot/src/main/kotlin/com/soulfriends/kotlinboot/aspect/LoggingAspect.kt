package com.soulfriends.kotlinboot.aspect

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Aspect
@Component
class LoggingAspect {

    private val logger = LoggerFactory.getLogger(this.javaClass)

    @Around("execution(* com.soulfriends.kotlinboot..*.*(..))")
    fun logMethodExecution(joinPoint: ProceedingJoinPoint): Any? {
        val methodName = joinPoint.signature.name
        val className = joinPoint.target.javaClass.simpleName

        logger.info("Entering method: $className.$methodName")

        val start = System.currentTimeMillis()
        val result = joinPoint.proceed()
        val executionTime = System.currentTimeMillis() - start

        logger.info("Exiting method: $className.$methodName. Execution time: $executionTime ms")

        return result
    }
}

