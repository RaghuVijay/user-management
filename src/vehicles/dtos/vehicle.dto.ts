import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { VehicleType } from '../enums/Vehicle-type.enum';

export class VehicleDto {
  @IsUUID()
  id: string;

  @IsString()
  @Matches(/^VEH\d+$/, {
    message: 'ID must start with "VEH" followed by digits ',
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(95)
  registration: string;

  @IsEnum(VehicleType)
  @IsNotEmpty()
  type: VehicleType;

  @IsString()
  @IsNotEmpty()
  customer_code: string;

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
