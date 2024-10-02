import * as process from "process"
import { HttpService } from "@nestjs/axios"
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common"
import { firstValueFrom } from "rxjs"

@Injectable()
export class YoutubeService {
  constructor(private readonly httpService: HttpService) {}

  async searchSong(title: string): Promise<string> {
    const url = `${process.env.YOUTUBE_API_URL}?part=snippet&type=video&maxResults=1&videoEmbeddable=true&q=${encodeURIComponent(title)}&key=${process.env.YOUTUBE_API_KEY}`

    try {
      const response = await firstValueFrom(this.httpService.get(url)) // firstValueFrom 사용
      const items = response.data.items

      if (!items || items.length === 0) {
        throw new NotFoundException("No results found.")
      }

      const videoId = items[0].id.videoId
      return `https://www.youtube.com/watch?v=${videoId}` // YouTube URL 반환
    } catch (error) {
      console.error(
        "Error fetching YouTube data:",
        error.response ? error.response.data : error.message
      )
      throw new InternalServerErrorException(
        "Failed to fetch data from YouTube."
      )
    }
  }
}
