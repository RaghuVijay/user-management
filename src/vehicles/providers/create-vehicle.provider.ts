import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicles } from '../vehicles.entity';
import { VehicleDto } from '../dtos/vehicle.dto';
import { ActiveUserData } from 'src/auth/interface/active-user-data.interface';

@Injectable()
export class CreateVehicleProvider {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
  ) {}

  public async createVehicle(data: VehicleDto, user: ActiveUserData) {
    const dataCode = user.sub;
    try {
      const existingVehicle = await this.vehiclesRepository.findOne({
        where: { registration: data.registration },
      });
      if (existingVehicle) {
        throw new BadRequestException(
          `A vehicle with code '${data.registration}' already exists. Please use a different code.`,
        );
      }
      const obj = {
        registration: data.registration,
        type: data.type,
        customer_code: user.sub,
      };
      const newVehicle = this.vehiclesRepository.create(obj);
      return await this.vehiclesRepository.save(newVehicle);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Rethrow client-related exceptions
      }

      console.error('Database operation failed:', error.message);

      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        { description: 'Database connection error' },
      );
    }
  }
}
