import { Inject, Injectable } from '@nestjs/common';
import { CreateUserProvider } from './create-user.provider';
import { Signup } from '../dtos/signup.dto';
import { CreateCustomerProvider } from 'src/customers/providers/create-customer';
import { Signup as customerSignup } from 'src/customers/dtos/signup.dto';
import { GetUserByIdProvider } from './get-user-by-id.provider';
import { GetUsersParamDto } from '../dtos/get-user.dto';
import { GetCustomerByIdProvider } from 'src/customers/providers/get-customer-by-id.provider';
import { CustomersService } from 'src/customers/providers/customers.service';
import { updateUser } from '../dtos/update-user.dto';
import { UpdateUserDataProvider } from './update-user-data.provider';
import { DeleteUserProvider } from './delete-user.provider';

@Injectable()
export class UserService {
  constructor(
    private createUserProvider: CreateUserProvider,

    @Inject()
    private readonly customersService: CustomersService,

    private readonly getUserById: GetUserByIdProvider,

    private readonly updateUser: UpdateUserDataProvider,

    private readonly deleteUserById: DeleteUserProvider,
  ) {}

  public async createUser(userDto: Signup) {
    return await this.createUserProvider.createUser(userDto);
  }
  public async createCustomer(customerDto: customerSignup) {
    return await this.customersService.createUser(customerDto);
  }
  public async getUsersOrById(getUserParamDto?: string) {
    return await this.getUserById.getUsers(getUserParamDto);
  }
  public async updateUserById(updateData: updateUser, id: string) {
    return await this.updateUser.updateUserData(updateData, id);
  }
  public async deleteUser(id: string) {
    return await this.deleteUserById.deleteUser(id);
  }
}
