import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDto } from '../dtos/customers.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { Creds } from 'src/auth/auth.entity';
import { convertDate } from '../utils/dateConverter';
import { Signup } from '../dtos/signup.dto';
import { Customers } from '../customers.entity';

@Injectable()
export class CreateCustomerProvider {
  constructor(
    @InjectRepository(Customers)
    private customerRepository: Repository<Customers>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @InjectRepository(Creds)
    private credRepository: Repository<Creds>,
  ) {}

  public async createCustomer(CustomerDto: Signup) {
    let existinguser = undefined;

    try {
      existinguser = await this.credRepository.findOne({
        where: { email: CustomerDto.email },
      });
    } catch (error) {
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

    let newCustomer = this.customerRepository.create({
      ...CustomerDto,
      dob: convertDate(CustomerDto.dob),
      // cred_code: newCreds.code,
    });
    try {
      newCustomer = await this.customerRepository.save(newCustomer);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }
    let newCreds = this.credRepository.create({
      email: CustomerDto.email,
      password: await this.hashingProvider.hashPassword(CustomerDto.password),
      code: newCustomer.code,
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

    return [newCustomer, newCreds];
  }
}
