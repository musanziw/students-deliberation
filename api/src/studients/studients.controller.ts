import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudientsService } from './studients.service';
import { CreateStudientDto } from './dto/create-studient.dto';
import { UpdateStudientDto } from './dto/update-studient.dto';

@Controller('studients')
export class StudientsController {
  constructor(private readonly studientsService: StudientsService) {}

  @Post()
  create(@Body() createStudientDto: CreateStudientDto) {
    return this.studientsService.create(createStudientDto);
  }

  @Get()
  findAll() {
    return this.studientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudientDto: UpdateStudientDto) {
    return this.studientsService.update(+id, updateStudientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studientsService.remove(+id);
  }
}
