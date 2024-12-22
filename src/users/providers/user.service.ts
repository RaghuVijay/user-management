import { Inject, Injectable } from '@nestjs/common';
import { CreateUserProvider } from './create-user.provider';
import { Signup } from '../dtos/signup.dto';
import { CreateCustomerProvider } from 'src/customers/providers/create-customer';
import { Signup as customerSignup } from 'src/customers/dtos/signup.dto';

@Injectable()
export class UserService {
  constructor(
    private createUserProvider: CreateUserProvider,

    @Inject()
    private readonly createCustomerProvider: CreateCustomerProvider,
  ) {}

  public async createUser(userDto: Signup) {
    return await this.createUserProvider.createUser(userDto);
  }
  public async createCustomer(customerDto: customerSignup) {
    return await this.createCustomerProvider.createCustomer(customerDto);
  }
}
