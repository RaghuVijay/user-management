import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  UnauthorizedException,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { Signup } from './dtos/signup.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Type } from './enums/authType.enum';
import { CustomersService } from 'src/customers/providers/customers.service';
import { Signup as customerSignup } from 'src/customers/dtos/signup.dto';
import { GetUsersParamDto } from './dtos/get-user.dto';
import { updateUser } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject()
    private userService: UserService,
  ) {}

  @Post('signup/:type')
  @Auth(AuthType.None)
  public createUser(
    @Body() userDto: Signup | customerSignup,
    @Param('type') type: Type,
  ) {
    if (type === Type.user) {
      return this.userService.createUser(userDto as Signup);
    } else if (type === Type.customer) {
      return this.userService.createCustomer(userDto as customerSignup);
    } else {
      throw new UnauthorizedException('Sign up in the given types', {
        description: 'Check the URL and try again',
      });
    }
  }
  @Get('/:id?')
  @Auth(AuthType.Bearer)
  public getUsers(
    @Param('id') getUserParamDto?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ) {
    return this.userService.getUsersOrById(getUserParamDto);
  }

  @Patch('/:id')
  @Auth(AuthType.Bearer)
  public updateUser(@Param('id') id: string, @Body() updateBody: updateUser) {
    return this.userService.updateUserById(updateBody, id);
  }
  @Delete('/:id')
  @Auth(AuthType.Bearer)
  public deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
