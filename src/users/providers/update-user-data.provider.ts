import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from '../users.entity';
import { Repository } from 'typeorm';
import { updateUser } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserDataProvider {
  constructor(
    @InjectRepository(users)
    private readonly usersRepository: Repository<users>,
  ) {}
  public async updateUserData(data: updateUser, id: string) {
    let user = await this.usersRepository.findOne({
      where: { code: id },
    });
    if (!user) {
      throw new NotFoundException(`User with code ${id} not found`);
    }

    Object.assign(user, data);

    return await this.usersRepository.save(user);
  }
}
