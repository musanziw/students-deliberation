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
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Grade } from '../grades/entities/grade.entity';

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

  @Get('grades/:id')
  getGrades(@Param('id') id: string) {
    return this.studentsService.deliberate(+id);
  }

  @Post('success/:id')
  success(@Param('id') id: string) {
    return this.studentsService.success(+id);
  }

  @Post('fail/:id/:grades')
  faillure(@Param('id') id: string, @Param('grades') grades: Grade[]) {
    return this.studentsService.faillure(+id, grades);
  }

  @Post('fail/:id/:grades')
  succedWith(@Param('id') id: string, @Param('grades') grades: Grade[]) {
    return this.studentsService.succedWith(+id, grades);
  }
}
