import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Creds } from '../auth.entity';
import { ActiveUserData } from '../interface/active-user-data.interface';
import { users } from 'src/users/users.entity';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(Id: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: Id,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
  public async generateTokens(user: Creds, code: users | any) {
    console.log(user, code);
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.code,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, mall_code: code.mall_code },
      ),

      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
