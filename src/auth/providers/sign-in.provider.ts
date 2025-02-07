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
import { users } from 'src/users/users.entity';
import { GetUserByIdProvider } from 'src/users/providers/get-user-by-id.provider';
import { GetCustomerByIdProvider } from 'src/customers/providers/get-customer-by-id.provider';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly findOneByEmail: FindOneByEmailProvider,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokenProvider: GenerateTokensProvider,

    private readonly getUserById: GetUserByIdProvider,

    private readonly getCustomerByID: GetCustomerByIdProvider,
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

    let mallCode: any;
    //   (await this.getUserById.getUsers(user.code)) ||
    //   (await this.getCustomerByID.getCustomers(user.code));
    const [userResult, customerResult] = await Promise.allSettled([
      this.getUserById.getUsers(user.code),
      this.getCustomerByID.getCustomers(user.code),
    ]);
    if (userResult.status === 'fulfilled') {
      mallCode = userResult.value;
    } else if (customerResult.status === 'fulfilled') {
      mallCode = customerResult.value;
    } else {
      console.error(
        'Both requests failed:',
        userResult.reason,
        customerResult.reason,
      );
    }
    return this.generateTokenProvider.generateTokens(user, mallCode);
  }
}
