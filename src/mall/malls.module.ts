import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Malls } from './mall.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Malls])],
})
export class MallsModule {}
