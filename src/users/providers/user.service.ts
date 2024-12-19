import { Repository } from 'typeorm';
import { users } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Creds } from 'src/auth/auth.entity';
import { CreateUserProvider } from './create-user.provider';
import { Signup } from '../dtos/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(users)
    private usersRepository: Repository<users>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @InjectRepository(Creds)
    private credRepository: Repository<Creds>,

    private createUserProvider: CreateUserProvider,
  ) {}

  public async createUser(userDto: Signup) {
    return await this.createUserProvider.createUser(userDto);
  }
}
