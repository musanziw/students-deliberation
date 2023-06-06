import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from '../auth/guard';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Controller('students')
@UseGuards(AuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Get('fields/:field/promotions/:promotion')
  getStudentByPromotion(
    @Param('field') field: string,
    @Param('promotion') promotion: string,
  ) {
    return this.studentsService.sudentsByPromotion(+field, +promotion);
  }

  @Get('courses/:id')
  getCourses(@Param('id') id: string) {
    return this.studentsService.findStudentWithCourses(+id);
  }
}
