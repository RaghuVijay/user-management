import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class updateUser {
  @IsString()
  @IsOptional()
  @MaxLength(95)
  name?: string;

  @IsUrl()
  @IsOptional()
  profile_pic?: string;

  @IsString()
  @IsOptional()
  mall_code?: string;
}
