import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { CreateUserDto, UpdateUserDto } from "./user.dto"
import { User } from "./user.entity"

@Injectable()
export class UserService {
  constructor(
    //레포지토리 주입
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user)
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

  async findByEmailOrSave(email, user_name, provider_id): Promise<User> {
    const foundUser = await this.getUserByEmail(email)
    if (foundUser) {
      return foundUser
    }

    const newUser = await this.userRepository.save({
      user_name,
      email,
      provider_id,
      provider: "google",
    })
    return newUser
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
}
