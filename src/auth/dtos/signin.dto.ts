import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { AuthType } from '../enums/authType';

export class SignInDto {
  @IsUUID()
  id: string;

  @IsString()
  @Matches(/^CUS\d+$/, {
    message: 'ID must start with "CRED" followed by digits ',
  })
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  private _email: string;
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  @IsEnum(AuthType)
  @IsNotEmpty()
  type: AuthType;

  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  updated_at: Date;

  @IsNotEmpty()
  @IsDate()
  deleted_at: Date;
}
