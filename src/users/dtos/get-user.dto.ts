import { IsOptional, IsString } from 'class-validator';

export class GetUsersParamDto {
  @IsOptional()
  @IsString()
  code?: string;
}
