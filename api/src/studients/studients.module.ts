import { Module } from '@nestjs/common';
import { StudientsService } from './studients.service';
import { StudientsController } from './studients.controller';

@Module({
  controllers: [StudientsController],
  providers: [StudientsService]
})
export class StudientsModule {}
