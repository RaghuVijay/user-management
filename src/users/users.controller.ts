import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserDto } from './dtos/users.dto';
import { Signup } from './dtos/signup.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  public createUser(@Body() userDto: Signup) {
    return this.userService.createUser(userDto);
  }
}
