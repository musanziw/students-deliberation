import { Module } from '@nestjs/common';
import { DeliberationService } from './deliberation.service';
import { DeliberationController } from './deliberation.controller';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  providers: [DeliberationService],
  controllers: [DeliberationController],
  imports: [PdfModule],
})
export class DeliberationModule {}
