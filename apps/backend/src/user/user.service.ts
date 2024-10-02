import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { CreateUserDto, UpdateUserDto } from "./user.dto"
import { User } from "./user.entity"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save({
      user_name: createUserDto.user_name,
      email: createUserDto.email,
      provider_id: createUserDto.provider_id,
      provider: createUserDto.provider,
    })
  }

  async getUserByEmail(email: string): Promise<User> {
    const result = await this.userRepository.findOne({
      where: { email },
    })
    return result
  }

  async getUserById(id: number): Promise<User> {
    const result = await this.userRepository.findOne({
      where: { id },
    })
    return result
  }

  async findByEmailOrSave(
    email,
    user_name,
    provider_id,
    provider
  ): Promise<User> {
    const foundUser = await this.getUserByEmail(email)
    if (foundUser) {
      return foundUser
    }

    return await this.createUser({
      user_name,
      email,
      provider_id,
      provider,
    })
  }

  async updateNickname(
    id: number,
    userData: UpdateUserDto
  ): Promise<User | null> {
    const result = await this.userRepository.update(id, {
      user_name: userData.username,
    })

    if (result.affected > 0) {
      return this.userRepository.findOne({ where: { id } })
    }

    throw new NotFoundException(`ID ${id}가 잘못되었습니다.`)
  }

  async setRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.userRepository.update(id, {
      refresh_token: refreshToken,
    })
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { refresh_token: refreshToken },
    })
  }
}
