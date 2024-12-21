import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthTypeEnum } from '../enums/auth-type.enum';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...authTypes: AuthTypeEnum[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);

export { AUTH_TYPE_KEY };
