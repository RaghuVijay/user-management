import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creds } from '../auth.entity';
import { when } from 'joi';
import { error } from 'console';

@Injectable()
export class FindOneByEmailProvider {
  constructor(
    @InjectRepository(Creds)
    private readonly credRepository: Repository<Creds>,
  ) {}

  public async findOneByEmail(email: string) {
    let user: Creds | undefined = undefined;
    try {
      user = await this.credRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch user',
      });
    }
    if (!user) {
      throw new UnauthorizedException(error, {
        description: 'user dont exist',
      });
    }
    return user;
  }
}
