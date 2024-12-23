import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from '../users.entity';
import { Repository } from 'typeorm';
import { GetUsersParamDto } from '../dtos/get-user.dto';
import { UserDto } from '../dtos/users.dto';

@Injectable()
export class GetUserByIdProvider {
  constructor(
    @InjectRepository(users)
    public readonly usersRepository: Repository<users>,
  ) {}

  public async getUsers(param?: string) {
    if (param) {
      const user = await this.usersRepository.findOne({
        where: { code: param },
      });
      if (!user) {
        throw new NotFoundException(`User with code ${param} not found`);
      }
      return user;
    }

    const allUsers = await this.usersRepository.find();
    return allUsers;
  }
}
