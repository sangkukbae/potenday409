import { Body, Controller, Post } from "@nestjs/common"

import { ClovaService } from "./clova.service"

@Controller("clova")
export class ClovaController {
  constructor(private readonly clovaService: ClovaService) {}

  @Post("generate")
  async generateResponse(
    @Body() body: { title: string; character: string; content: string }
  ) {
    const { character, title, content } = body
    return this.clovaService.generateResponse(character, title, content)
  }
}
