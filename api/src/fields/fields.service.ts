import { Injectable } from '@nestjs/common';

import { CreateFieldDto, UpdateFieldDto } from './dto';

@Injectable()
export class FieldsService {
  constructor() {}

  async create(createFieldDto: CreateFieldDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateFieldDto: UpdateFieldDto) {}

  async remove(id: number) {}
}
