import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { Signup } from './dtos/signup.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Type } from './enums/authType.enum';
import { CustomersService } from 'src/customers/providers/customers.service';
import { Signup as customerSignup } from 'src/customers/dtos/signup.dto';

@Controller('signup')
export class UsersController {
  constructor(
    @Inject()
    private userService: UserService,

    @Inject()
    private customerService: CustomersService,
  ) {}

  @Post('/:type')
  @Auth(AuthType.None)
  public createUser(
    @Body() userDto: Signup | customerSignup,
    @Param('type') type: Type,
  ) {
    if (type === Type.user) {
      return this.userService.createUser(userDto as Signup);
    } else if (type === Type.customer) {
      return this.customerService.createUser(userDto as customerSignup);
    } else {
      throw new UnauthorizedException('Sign up in the given types', {
        description: 'Check the URL and try again',
      });
    }
  }
}
