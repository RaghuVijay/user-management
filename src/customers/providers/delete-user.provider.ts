import { Injectable, NotFoundException } from '@nestjs/common';
import { Customers } from '../customers.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeletecustomersProvider {
  constructor(
    @InjectRepository(Customers)
    private readonly customerssRepository: Repository<Customers>,
  ) {}
  public async deleteUser(id: string) {
    let customers = await this.customerssRepository.findOne({
      where: { code: id },
    });
    if (!customers) {
      throw new NotFoundException(`customers with code ${id} not found`);
    }
    await this.customerssRepository.remove(customers);
    return `the customers with ${id} has been deleted`;
  }
}
