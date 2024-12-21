import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { Signup } from './dtos/signup.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/authType';
import { AuthTypeEnum } from 'src/auth/enums/auth-type.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  @Auth(AuthTypeEnum.None)
  public createUser(@Body() userDto: Signup) {
    return this.userService.createUser(userDto);
  }
}
