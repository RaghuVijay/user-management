import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../customers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetCustomerByIdProvider {
  constructor(
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
  ) {}
  public async getCustomers(param?: string) {
    if (param) {
      // Fetch user by code
      const customer = await this.customersRepository.findOne({
        where: { code: param },
      });
      if (!customer) {
        throw new NotFoundException(`customer with code ${param} not found`);
      }
      return customer;
    }

    const allcustomers = await this.customersRepository.find();
    return allcustomers;
  }
}
