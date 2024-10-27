package com.soulfriends.kotlinboot.service

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import com.google.api.services.youtube.YouTube
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.IOException

@Service
class YouTubeService {
    private val logger = LoggerFactory.getLogger(this::class.java)

    @Value("\${youtube.api.key}")
    private lateinit var apiKey: String

    @Value("\${youtube.application.name:SoulFriends}")
    private lateinit var applicationName: String

    private val youtube: YouTube by lazy {
        try {
            YouTube.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                null
            )
                .setApplicationName(applicationName)
                .build()
        } catch (e: Exception) {
            logger.error("Failed to initialize YouTube client: ${e.message}", e)
            throw RuntimeException("YouTube client initialization failed", e)
        }
    }

    data class VideoInfo(
        val videoId: String,
        val title: String,
        val description: String,
        val thumbnailUrl: String
    )

    sealed class SearchResult {
        data class Success(val videos: List<VideoInfo>) : SearchResult()
        data class Error(val message: String, val cause: Throwable? = null) : SearchResult()
    }

    fun searchVideos(
        query: String,
        maxResults: Long = DEFAULT_MAX_RESULTS,
        fields: String = DEFAULT_FIELDS
    ): SearchResult {
        return try {
            logger.info("Searching for videos with query: $query, maxResults: $maxResults")

            val search = youtube.search().list(listOf("id", "snippet")).apply {
                key = apiKey
                q = query
                type = listOf("video")
                this.fields = fields
                this.maxResults = maxResults
            }

            val response = search.execute()
            val videos = response.items?.mapNotNull { searchResult ->
                searchResult.toVideoInfo()
            } ?: emptyList()

            logger.info("Found ${videos.size} videos for query: $query")
            SearchResult.Success(videos)

        } catch (e: IOException) {
            logger.error("Failed to search videos: ${e.message}", e)
            SearchResult.Error("Failed to perform video search", e)
        } catch (e: Exception) {
            logger.error("Unexpected error during video search: ${e.message}", e)
            SearchResult.Error("Unexpected error occurred", e)
        }
    }

    private fun com.google.api.services.youtube.model.SearchResult.toVideoInfo(): VideoInfo? {
        return try {
            val videoId = this.id?.videoId
            val snippet = this.snippet

            if (videoId != null &&
                snippet?.title != null &&
                snippet.description != null &&
                snippet.thumbnails?.default?.url != null) {

                VideoInfo(
                    videoId = videoId,
                    title = snippet.title,
                    description = snippet.description,
                    thumbnailUrl = snippet.thumbnails.default.url
                )
            } else {
                logger.warn("Missing required fields in search result")
                null
            }
        } catch (e: Exception) {
            logger.warn("Failed to parse search result: ${e.message}")
            null
        }
    }

    companion object {
        private const val DEFAULT_FIELDS = "items(id/videoId,snippet/title,snippet/description,snippet/thumbnails/default/url)"
        private const val DEFAULT_MAX_RESULTS = 10L
    }
}