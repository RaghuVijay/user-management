import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../customers.entity';
import { Repository } from 'typeorm';
import { updateCustomer } from '../dtos/updateCustomer.dto';

@Injectable()
export class UpdatecustomersProvider {
  constructor(
    @InjectRepository(Customers)
    private readonly customerssRepository: Repository<Customers>,
  ) {}
  public async updateCustomerData(data: updateCustomer, id: string) {
    let user = await this.customerssRepository.findOne({
      where: { code: id },
    });
    if (!user) {
      throw new NotFoundException(`User with code ${id} not found`);
    }

    Object.assign(user, data);

    return await this.customerssRepository.save(user);
  }
}
