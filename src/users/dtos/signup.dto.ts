import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { gender } from '../enums/gender';

export class Signup {
  @IsUUID()
  id: string;

  @IsString()
  @Matches(/^USR\d+$/, {
    message: 'ID must start with "USR" followed by digits ',
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(95)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  @IsUrl()
  @IsOptional()
  profile_pic?: string;

  @IsString()
  @IsNotEmpty()
  dob: string;

  @IsEnum(gender)
  @IsNotEmpty()
  gender: gender;

  @IsString()
  @IsNotEmpty()
  mall_code: string;

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
