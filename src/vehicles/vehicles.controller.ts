import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VehicleService } from './providers/vehicle.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { VehicleDto } from './dtos/vehicle.dto';
import { updateVehicle } from './dtos/update-vehicle.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interface/active-user-data.interface';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehicleService) {}
  @Post('/create')
  @Auth(AuthType.Bearer)
  public createUser(
    @Body() vehicleDto: VehicleDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.vehicleService.createVehicle(vehicleDto, user);
  }
  @Get('/:id?')
  @Auth(AuthType.Bearer)
  public getUsers(
    @Param('id') getVehicleParamDto?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ) {
    return this.vehicleService.getVehiclessOrById(getVehicleParamDto);
  }

  @Patch('/:id')
  @Auth(AuthType.Bearer)
  public updateUser(
    @Param('id') id: string,
    @Body() updateBody: updateVehicle,
  ) {
    return this.vehicleService.updateVehiclesById(updateBody, id);
  }
  @Delete('/:id')
  @Auth(AuthType.Bearer)
  public deleteUser(@Param('id') id: string) {
    return this.vehicleService.deleteVehicle(id);
  }
}
