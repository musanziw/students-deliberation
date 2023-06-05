import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateFieldDto, UpdateFieldDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FieldsService {
  constructor(private prismaService: PrismaService) {}

  async create(createFieldDto: CreateFieldDto) {
    const { name, faculty } = createFieldDto;
    try {
      await this.prismaService.field.create({
        data: {
          name,
          faculty: {
            connect: {
              id: faculty,
            },
          },
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'La filière a bien été créée',
      };
    } catch {
      throw new HttpException(
        'Erreur lors de la création de la filière',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const fields = await this.prismaService.field.findMany({
        orderBy: {
          name: 'asc',
        },
        include: {
          faculty: true,
        },
      });
      return {
        status: HttpStatus.OK,
        fields,
      };
    } catch {
      throw new HttpException('Aucune filière trouvée', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number) {
    try {
      const field = await this.prismaService.field.findUniqueOrThrow({
        where: { id },
        include: {
          faculty: true,
        },
      });
      return {
        status: HttpStatus.OK,
        field,
      };
    } catch {
      throw new HttpException('Filière non trouvée', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateFieldDto: UpdateFieldDto) {
    const { name, faculty } = updateFieldDto;
    try {
      await this.prismaService.field.update({
        where: { id },
        data: {
          name,
          faculty: {
            connect: {
              id: faculty,
            },
          },
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'La filière a bien été modifiée',
      };
    } catch {
      throw new HttpException(
        'Erreur lors de la modification de la filière',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.field.delete({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        message: 'La filière a bien été supprimée',
      };
    } catch {
      throw new HttpException(
        'Erreur lors de la suppression de la filière',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
