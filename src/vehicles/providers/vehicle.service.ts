import { Injectable } from '@nestjs/common';
import { CreateVehicleProvider } from './create-vehicle.provider';
import { VehicleDto } from '../dtos/vehicle.dto';
import { GetVehicleProvider } from './get-vehicle.provider';
import { UpdateVehicleProvider } from './update-vehicle.provider';
import { DeleteVehicleProvider } from './delete-vehicle.provider';
import { updateVehicle } from '../dtos/update-vehicle.dto';
import { ActiveUserData } from 'src/auth/interface/active-user-data.interface';

@Injectable()
export class VehicleService {
  constructor(
    private readonly createvehicle: CreateVehicleProvider,

    private readonly getVehicle: GetVehicleProvider,

    private readonly updateVehicle: UpdateVehicleProvider,

    private readonly deleteVehicles: DeleteVehicleProvider,
  ) {}

  public async createVehicle(data: VehicleDto, user: ActiveUserData) {
    return await this.createvehicle.createVehicle(data, user);
  }
  public async getVehiclessOrById(getVehiclesParamDto?: string) {
    return await this.getVehicle.getVehicles(getVehiclesParamDto);
  }
  public async updateVehiclesById(updateData: updateVehicle, id: string) {
    return await this.updateVehicle.updateVehicleData(updateData, id);
  }
  public async deleteVehicle(id: string) {
    return await this.deleteVehicles.deleteVehicles(id);
  }
}
