import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    //레포지토리 주입
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  async findByEmailOrSave(email, username, providerId): Promise<User> {
    const foundUser = await this.getUser(email);
    if (foundUser) {
      return foundUser;
    }

    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });
    return newUser;
  }
}
