import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicles } from '../vehicles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteVehicleProvider {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehiclessRepository: Repository<Vehicles>,
  ) {}
  public async deleteVehicles(id: string) {
    let vehicles = await this.vehiclessRepository.findOne({
      where: { code: id },
    });
    if (!vehicles) {
      throw new NotFoundException(`Vehicles with code ${id} not found`);
    }
    await this.vehiclessRepository.remove(vehicles);
    return `the Vehicles with ${id} has been deleted`;
  }
}
