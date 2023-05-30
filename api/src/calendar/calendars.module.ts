import { Module } from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CalendarsController } from './calendars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from './entities/calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  controllers: [CalendarsController],
  providers: [CalendarsService],
})
export class CalendarsModule {}
