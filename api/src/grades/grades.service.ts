import { Injectable } from '@nestjs/common';
import { CreateGradeDto, UpdateGradeDto } from './dto';

@Injectable()
export class GradesService {
  constructor() {}

  async create(createGradeDto: CreateGradeDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateGradeDto: UpdateGradeDto) {}

  async remove(id: number) {}
}
