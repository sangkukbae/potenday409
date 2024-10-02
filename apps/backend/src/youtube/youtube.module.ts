import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { YoutubeService } from "./youtube.service"

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class YoutubeModule {}
