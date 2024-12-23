import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { CustomersService } from './providers/customers.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetCustomersParamDto } from './dtos/getCustomerParams.dto';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { updateCustomer } from './dtos/updateCustomer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Get('/:id?')
  @Auth(AuthType.Bearer)
  public async getCustomers(
    @Param('id') id?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ) {
    return this.customerService.getCustomer(id);
  }
  @Patch('/:id')
  @Auth(AuthType.Bearer)
  public updateUser(
    @Param('id') id: string,
    @Body() updateBody: updateCustomer,
  ) {
    return this.customerService.updateUserById(updateBody, id);
  }
  @Delete('/:id')
  @Auth(AuthType.Bearer)
  public deleteUser(@Param('id') id: string) {
    return this.customerService.deleteUser(id);
  }
}
