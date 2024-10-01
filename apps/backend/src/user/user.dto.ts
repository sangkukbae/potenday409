import { IsEmail, IsString } from "class-validator"

export class CreateUserDto {
  @IsString()
  username: string

  @IsEmail()
  email: string

  @IsString()
  provider_id: string

  @IsString()
  provider: string
}

export class UpdateUserDto {
  @IsString()
  username: string
}
