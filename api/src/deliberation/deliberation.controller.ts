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
}
