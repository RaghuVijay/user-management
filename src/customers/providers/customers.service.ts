import { Inject, Injectable } from '@nestjs/common';
import { Signup } from '../dtos/signup.dto';
import { CreateCustomerProvider } from './create-customer';

@Injectable()
export class CustomersService {
  constructor(
    @Inject()
    private readonly createCustomerProvider: CreateCustomerProvider,
  ) {}
  public async createUser(customerDto: Signup) {
    return await this.createCustomerProvider.createCustomer(customerDto);
  }
}
