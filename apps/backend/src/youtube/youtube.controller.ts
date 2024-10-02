import { Controller, Get, Query } from "@nestjs/common"

import { YoutubeService } from "./youtube.service"

@Controller("youtube")
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get("search")
  async search(@Query("title") title: string) {
    return { url: await this.youtubeService.searchSong(title) }
  }
}
