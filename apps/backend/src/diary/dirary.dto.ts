import { IsNotEmpty } from "class-validator"

export class CreateDiaryDto {
  @IsNotEmpty()
  user_id: number

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  context: string

  @IsNotEmpty()
  character: string
}

export class UpdateDiaryDto {
  @IsNotEmpty()
  context: string

  @IsNotEmpty()
  heart: number
}
