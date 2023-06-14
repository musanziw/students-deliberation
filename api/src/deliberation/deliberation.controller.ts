import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DeliberationService } from './deliberation.service';
import { AuthGuard } from '../auth/guard';

@Controller('deliberate')
@UseGuards(AuthGuard)
export class DeliberationController {
  constructor(private readonly deliberationService: DeliberationService) {}

  @Get(':id')
  async getGrades(@Param('id') id: number) {
    return this.deliberationService.getDeliberatedGrades(+id);
  }

  @Get('send/report/:id-:level')
  async sendReport(@Param('id') id: number, @Param('level') level: number) {
    return this.deliberationService.sendReportToStudent(+id, +level);
  }
}
