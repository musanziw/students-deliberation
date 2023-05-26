import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  controllers: [PeriodsController],
  providers: [PeriodsService],
})
export class PeriodsModule {}
