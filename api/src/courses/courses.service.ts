import { Injectable } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@Injectable()
export class CoursesService {
  constructor() {}

  async create(createCourseDto: CreateCourseDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateCourseDto: UpdateCourseDto) {}

  async remove(id: number) {}
}
