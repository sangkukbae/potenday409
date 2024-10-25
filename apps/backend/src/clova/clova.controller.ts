import { Controller } from "@nestjs/common"

import { ClovaService } from "./clova.service"

@Controller("clova")
export class ClovaController {
  constructor(private readonly clovaService: ClovaService) {}
}
