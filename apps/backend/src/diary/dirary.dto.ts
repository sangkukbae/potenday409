import { IsNotEmpty } from "class-validator"

export class CreateDiaryDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  character: string
}

export class UpdateDiaryDto {
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  heart: number
}
