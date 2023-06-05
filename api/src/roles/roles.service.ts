import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      await this.prismaService.role.create({
        data: createRoleDto,
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Le rôle a bien été créé',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Erreur lors de la création du rôle',
      };
    }
  }

  async findAll() {
    try {
      const roles = await this.prismaService.role.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return {
        status: HttpStatus.OK,
        roles,
      };
    } catch {
      throw new HttpException(
        'Erreur lors de la récupération des rôles',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.prismaService.role.findUniqueOrThrow({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        role,
      };
    } catch {
      throw new HttpException(
        "Erreur lors de la récupération du rôle d'id " + id,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.prismaService.role.update({
      where: { id },
      data: updateRoleDto,
    });
    return {
      status: HttpStatus.OK,
      message: 'Le rôle a bien été mis à jour',
    };
  }

  async remove(id: number) {
    try {
      this.prismaService.role.delete({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        message: 'Le rôle a bien été supprimé',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Erreur lors de la suppression du rôle',
      };
    }
  }
}
