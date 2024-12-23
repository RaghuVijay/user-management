import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from '../users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUserProvider {
  constructor(
    @InjectRepository(users)
    private readonly usersRepository: Repository<users>,
  ) {}
  public async deleteUser(id: string) {
    let user = await this.usersRepository.findOne({
      where: { code: id },
    });
    if (!user) {
      throw new NotFoundException(`User with code ${id} not found`);
    }
    await this.usersRepository.remove(user);
    return `the user with ${id} has been deleted`;
  }
}
