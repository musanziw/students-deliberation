import { Module } from '@nestjs/common';
import { DeliberationService } from './deliberation.service';
import { DeliberationController } from './deliberation.controller';

@Module({
  providers: [DeliberationService],
  controllers: [DeliberationController]
})
export class DeliberationModule {}
