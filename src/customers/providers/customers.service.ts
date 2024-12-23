import { Inject, Injectable } from '@nestjs/common';
import { Signup } from '../dtos/signup.dto';
import { CreateCustomerProvider } from './create-customer';
import { GetCustomerByIdProvider } from './get-customer-by-id.provider';
import { GetCustomersParamDto } from '../dtos/getCustomerParams.dto';
import { DeletecustomersProvider } from './delete-user.provider';

import { updateCustomer } from '../dtos/updateCustomer.dto';
import { UpdatecustomersProvider } from './update-customer-data.provider';

@Injectable()
export class CustomersService {
  constructor(
    @Inject()
    private readonly createCustomerProvider: CreateCustomerProvider,

    private readonly getCustomerById: GetCustomerByIdProvider,

    private readonly updateCustomer: UpdatecustomersProvider,

    private readonly deleteCustomerById: DeletecustomersProvider,
  ) {}
  public async createUser(customerDto: Signup) {
    return await this.createCustomerProvider.createCustomer(customerDto);
  }
  public async getCustomer(params: string) {
    return await this.getCustomerById.getCustomers(params);
  }
  public async updateUserById(updateData: updateCustomer, id: string) {
    return await this.updateCustomer.updateCustomerData(updateData, id);
  }
  public async deleteUser(id: string) {
    return await this.deleteCustomerById.deleteUser(id);
  }
}
