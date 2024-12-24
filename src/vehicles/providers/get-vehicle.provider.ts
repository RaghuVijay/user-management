import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicles } from '../vehicles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetVehicleProvider {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehicleRepository: Repository<Vehicles>,
  ) {}
  public async getVehicles(param?: string) {
    if (param) {
      const vehicles = await this.vehicleRepository.findOne({
        where: { code: param },
      });
      if (!vehicles) {
        throw new NotFoundException(`Vehicles with code ${param} not found`);
      }
      return vehicles;
    }

    const allvehicless = await this.vehicleRepository.find();
    return allvehicless;
  }
}
