import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './providers/user.service';
import { CreateUserProvider } from './providers/create-user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { CustomersService } from 'src/customers/providers/customers.service';
import { GetUserByIdProvider } from './providers/get-user-by-id.provider';
import { UpdateUserDataProvider } from './providers/update-user-data.provider';
import { DeleteUserProvider } from './providers/delete-user.provider';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([users]),
    CustomersModule,
  ],
  exports: [UserService],
  providers: [CreateUserProvider, UserService, GetUserByIdProvider, UpdateUserDataProvider, DeleteUserProvider],
})
export class UsersModule {}
