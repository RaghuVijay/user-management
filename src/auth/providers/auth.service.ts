import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creds } from '../auth.entity';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshToken } from '../dtos/refreshToken.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly refreshTokenProvider: RefreshTokensProvider,

    private signInProvider: SignInProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshToken) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
