import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dtos/users.dto';
import { users } from '../users.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { Creds } from 'src/auth/auth.entity';
import { convertDate } from '../utils/dateConverter';
import { Signup } from '../dtos/signup.dto';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(users)
    private userRepository: Repository<users>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @InjectRepository(Creds)
    private credRepository: Repository<Creds>,
  ) {}

  public async createUser(userDto: Signup) {
    let existinguser = undefined;

    try {
      existinguser = await this.credRepository.findOne({
        where: { email: userDto.email },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'unable to process the request at the moment please try again later ',
        {
          description: 'Error connecting to database',
        },
      );
    }
    if (existinguser) {
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );
    }

    let newUser = this.userRepository.create({
      ...userDto,
      dob: convertDate(userDto.dob),
      // cred_code: newCreds.code,
    });
    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }
    let newCreds = this.credRepository.create({
      email: userDto.email,
      password: await this.hashingProvider.hashPassword(userDto.password),
      code: newUser.code,
    });

    try {
      newCreds = await this.credRepository.save(newCreds);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }

    return [newUser, newCreds];
  }
}
