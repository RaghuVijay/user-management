import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { gender } from '../enums/gender';

export class UserDto {
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
