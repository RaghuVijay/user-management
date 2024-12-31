import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from './auth.service';
import { GenerateTokensProvider } from './generate-token.provider';
import { RefreshToken } from '../dtos/refreshToken.dto';
import { ActiveUserData } from '../interface/active-user-data.interface';
import { FindOneByIdProvider } from './find-one-by-id.provider';
import { users } from 'src/users/users.entity';
import { Customers } from 'src/customers/customers.entity';
import { Creds } from '../auth.entity';
import { GetUserByIdProvider } from 'src/users/providers/get-user-by-id.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,

    private readonly findOneByID: FindOneByIdProvider,

    private readonly findUserByID: GetUserByIdProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshToken) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user: Creds = await this.findOneByID.findOneById(sub);
      const userCode: users | users[] = await this.findUserByID.getUsers(
        user.code,
      );

      return await this.generateTokensProvider.generateTokens(user, userCode);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
