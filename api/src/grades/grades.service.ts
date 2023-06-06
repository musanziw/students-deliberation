import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGradeDto, UpdateGradeDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GradesService {
  constructor(private prismaService: PrismaService) {}

  async create(createGradeDto: CreateGradeDto) {
    try {
      await this.prismaService.grade.create({
        data: {
          ...createGradeDto,
          course: {
            connect: {
              id: createGradeDto.course,
            },
          },
          student: {
            connect: {
              id: createGradeDto.student,
            },
          },
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: 'La note a été créée avec succès',
      };
    } catch {
      throw new HttpException(
        'Une erreur est survenue lors de la création de la note',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const grades = await this.prismaService.grade.findMany({
      include: {
        course: true,
        student: true,
      },
    });
    return {
      status: HttpStatus.OK,
      grades,
    };
  }

  async findOne(id: number) {
    const grade = await this.prismaService.grade.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
        student: true,
      },
    });
    return {
      status: HttpStatus.OK,
      grade,
    };
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    await this.prismaService.grade.update({
      where: {
        id,
      },
      data: {
        ...updateGradeDto,
        course: {
          connect: {
            id: updateGradeDto.course,
          },
        },
        student: {
          connect: {
            id: updateGradeDto.student,
          },
        },
      },
    });
    return {
      status: HttpStatus.OK,
      message: 'La note a été modifiée avec succès',
    };
  }

  async remove(id: number) {
    await this.prismaService.grade.delete({
      where: {
        id,
      },
    });
    return {
      status: HttpStatus.OK,
      message: 'La note a été supprimée avec succès',
    };
  }
}
