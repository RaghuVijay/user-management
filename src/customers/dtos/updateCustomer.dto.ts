import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class updateCustomer {
  @IsString()
  @IsOptional()
  @MaxLength(95)
  name?: string;

  @IsUrl()
  @IsOptional()
  profile_pic?: string;
}
