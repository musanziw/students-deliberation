import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacultyDto, UpdateFacultyDto } from './dto';

@Injectable()
export class FacultiesService {
  constructor() {}

  async create(createFacultyDto: CreateFacultyDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {}

  async remove(id: number) {}
}
