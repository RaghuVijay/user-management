import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './providers/user.service';
import { CreateUserProvider } from './providers/create-user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users.entity';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([users])],
  exports: [UserService],
  providers: [CreateUserProvider, UserService],
})
export class UsersModule {}
