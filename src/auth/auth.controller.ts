import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthTypeEnum } from './enums/auth-type.enum';
import { AuthType } from './enums/authType';
import { RefreshToken } from './dtos/refreshToken.dto';

@Controller('auth')
@Auth(AuthTypeEnum.None)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Auth(AuthTypeEnum.None)
  @Post('sign-in')
  public async signin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Auth(AuthTypeEnum.None)
  @Post('refresh-token')
  public async refreshToken(@Body() refreshToken: RefreshToken) {
    return this.authService.refreshTokens(refreshToken);
  }
}
