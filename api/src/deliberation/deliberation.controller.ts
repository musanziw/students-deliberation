import { Controller, Get, Param } from '@nestjs/common';
import { DeliberationService } from './deliberation.service';

@Controller('deliberation')
export class DeliberationController {
  constructor(private readonly deliberationService: DeliberationService) {}

  @Get(':id')
  async deliberate(@Param('id') id: number) {
    return this.deliberationService.deliberate(+id);
  }
}
