import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Post('sign-in'){
  // }
  // @Post('refresh-token'){}
  // @Post('forgot-password'){}
  // @Post('/sign-up')
  // createAuth(@Body() createAuthDto: CreateAuthDto) {
  //   console.log('here');
  //   return this.authService.createAuth(createAuthDto);
  // }
}
