import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { GenerateTokensProvider } from './providers/generate-token.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creds } from './auth.entity';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';
import { CustomersModule } from 'src/customers/customers.module';
import { ChangePasswordProvider } from './providers/change-password.provider';

@Module({
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokensProvider,
    FindOneByEmailProvider,
    SignInProvider,
    RefreshTokensProvider,
    FindOneByIdProvider,
    ChangePasswordProvider,
  ],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => CustomersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([Creds]),
  ],
  exports: [AuthService, HashingProvider, TypeOrmModule],
})
export class AuthModule {}
