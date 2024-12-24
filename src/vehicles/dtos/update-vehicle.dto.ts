import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { VehicleType } from '../enums/Vehicle-type.enum';

export class updateVehicle {
  @IsString()
  @IsOptional()
  @MaxLength(95)
  registration?: string;

  @IsString()
  @IsEnum(VehicleType)
  @IsOptional()
  type?: string;
}
