import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './providers/user.service';
import { CreateUserProvider } from './providers/create-user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { GetUserByIdProvider } from './providers/get-user-by-id.provider';
import { UpdateUserDataProvider } from './providers/update-user-data.provider';
import { DeleteUserProvider } from './providers/delete-user.provider';
import { GetMallCodeProviders } from './providers/get-mall_code.providers';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([users]),
    CustomersModule,
    HttpModule,
    ConfigModule,
  ],
  exports: [UserService, GetUserByIdProvider],
  providers: [
    CreateUserProvider,
    UserService,
    GetUserByIdProvider,
    UpdateUserDataProvider,
    DeleteUserProvider,
    GetMallCodeProviders,
  ],
})
export class UsersModule {}
