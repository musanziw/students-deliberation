import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      await this.roleRepository.save(createRoleDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Le rôle a bien été créé',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de créer le rôle',
      };
    }
  }

  async findAll() {
    const roles: Role[] = await this.roleRepository.find({
      order: { id: 'ASC' },
      relations: ['users'],
    });
    try {
      return {
        status: HttpStatus.OK,
        roles,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de récupérer les rôles',
      };
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOneOrFail({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        role,
      };
    } catch {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Impossible de récupérer le rôle',
      };
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      await this.roleRepository.update({ id }, updateRoleDto);
      return {
        status: HttpStatus.OK,
        message: 'Le rôle a bien été mis à jour',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de mettre à jour le rôle',
      };
    }
  }

  async remove(id: number) {
    try {
      await this.roleRepository.delete({ id });
      return {
        status: HttpStatus.OK,
        message: 'Le rôle a bien été supprimé',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de supprimer le rôle',
      };
    }
  }
}
