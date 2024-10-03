import { YoutubeService } from "@/youtube/youtube.service"
import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"

import { ClovaController } from "./clova.controller"
import { ClovaService } from "./clova.service"

@Module({
  imports: [HttpModule],
  controllers: [ClovaController],
  providers: [ClovaService, YoutubeService],
  exports: [ClovaService],
})
export class ClovaModule {}
