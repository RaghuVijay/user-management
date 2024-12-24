import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshToken } from './dtos/refreshToken.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserData } from './interface/active-user-data.interface';

@Controller('auth')
@Auth(AuthType.None)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Auth(AuthType.None)
  @Post('sign-in')
  public async signin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Auth(AuthType.None)
  @Post('refresh-token')
  public async refreshToken(@Body() refreshToken: RefreshToken) {
    return this.authService.refreshTokens(refreshToken);
  }
  @Auth(AuthType.Bearer)
  @Post('change-password')
  public async changePassword(@Body() newPassword: ChangePasswordDto) {
    return this.authService.changePassword(newPassword);
  }
  @Get('/validate')
  @Auth(AuthType.Bearer)
  public validaterRoute(@ActiveUser() user: ActiveUserData) {
    return user;
  }
}
