import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './customers.entity';
import { CreateCustomerProvider } from './providers/create-customer';
import { CustomersService } from './providers/customers.service';
import { GetCustomerByIdProvider } from './providers/get-customer-by-id.provider';
import { CustomersController } from './customers.controller';
import { UpdatecustomersProvider } from './providers/update-customer-data.provider';
import { DeletecustomersProvider } from './providers/delete-user.provider';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Customers]),
  ],
  providers: [
    CreateCustomerProvider,
    CustomersService,
    GetCustomerByIdProvider,
    UpdatecustomersProvider,
    DeletecustomersProvider,
  ],
  exports: [CustomersService, CreateCustomerProvider],
  controllers: [CustomersController],
})
export class CustomersModule {}
