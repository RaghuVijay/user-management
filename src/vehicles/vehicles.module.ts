import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehicleService } from './providers/vehicle.service';
import { Vehicles } from './vehicles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateVehicleProvider } from './providers/create-vehicle.provider';
import { GetVehicleProvider } from './providers/get-vehicle.provider';
import { UpdateVehicleProvider } from './providers/update-vehicle.provider';
import { DeleteVehicleProvider } from './providers/delete-vehicle.provider';

@Module({
  controllers: [VehiclesController],
  providers: [VehicleService, CreateVehicleProvider, GetVehicleProvider, UpdateVehicleProvider, DeleteVehicleProvider],
  imports: [TypeOrmModule.forFeature([Vehicles])],
  exports: [],
})
export class VehiclesModule {}
