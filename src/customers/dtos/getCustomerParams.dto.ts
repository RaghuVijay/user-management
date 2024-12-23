import { IsInt, IsOptional, IsString } from 'class-validator';
export class GetCustomersParamDto {
  @IsOptional()
  @IsString()
  code?: string;
}
