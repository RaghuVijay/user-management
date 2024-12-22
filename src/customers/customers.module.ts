import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './customers.entity';
import { CreateCustomerProvider } from './providers/create-customer';
import { CustomersService } from './providers/customers.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Customers]),
  ],
  providers: [CreateCustomerProvider, CustomersService],
  exports: [CustomersService, CreateCustomerProvider],
})
export class CustomersModule {}
