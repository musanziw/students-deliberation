import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/browser';

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
        message: 'Le rôle a été créé avec succès',
      };
    } catch {
      throw new HttpException(
        'Une erreur est survenue lors de la création du rôle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const roles: Role[] = await this.roleRepository.find({
      order: { id: 'ASC' },
      relations: ['users'],
    });
    return {
      status: HttpStatus.OK,
      roles,
    };
  }

  async findOne(id: number) {
    try {
      const role: Role = await this.roleRepository.findOneOrFail({
        where: { id },
        relations: ['users'],
      });
      return {
        status: HttpStatus.OK,
        role,
      };
    } catch {
      throw new HttpException('Le rôle est introuvable', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updateResult = await this.roleRepository.update(
      { id },
      updateRoleDto,
    );
    if (!updateResult.affected)
      throw new HttpException(
        'La mise à jour du rôle à échouée',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'Le rôle a bien été mis à jour',
    };
  }

  async remove(id: number) {
    const deleteResult: DeleteResult = await this.roleRepository.delete({ id });
    if (!deleteResult.affected)
      throw new HttpException(
        'Impossible de supprimer le role',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'Le rôle a bien été supprimé',
    };
  }
}
