import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor() {}

  async create(createRoleDto: CreateRoleDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateRoleDto: UpdateRoleDto) {}

  async remove(id: number) {}
}
