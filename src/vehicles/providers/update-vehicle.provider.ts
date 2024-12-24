import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehicles } from '../vehicles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateVehicle } from '../dtos/update-vehicle.dto';

@Injectable()
export class UpdateVehicleProvider {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehicleRepository: Repository<Vehicles>,
  ) {}
  public async updateVehicleData(data: updateVehicle, id: string) {
    let vehicle = await this.vehicleRepository.findOne({
      where: { code: id },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with code ${id} not found`);
    }

    Object.assign(vehicle, data);

    return await this.vehicleRepository.save(vehicle);
  }
}
