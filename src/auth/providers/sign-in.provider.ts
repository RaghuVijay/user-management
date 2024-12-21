import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-token.provider';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly findOneByEmail: FindOneByEmailProvider,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    let user = await this.findOneByEmail.findOneByEmail(signInDto.email);

    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare password ',
      });
    }
    if (!isEqual) {
      throw new UnauthorizedException('Password do not match');
    }

    return this.generateTokenProvider.generateTokens(user);
  }
}
