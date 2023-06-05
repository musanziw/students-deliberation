import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    await this.prismaService.course.create({
      data: {
        ...createCourseDto,
        teacher: {
          connect: {
            id: createCourseDto.teacher,
          },
        },
        fields: {
          connect: createCourseDto.fields.map((field) => ({ id: field })),
        },
      },
    });
    return {
      status: HttpStatus.CREATED,
      message: 'Le cours a été créé avec succès',
    };
  }

  async findAll() {
    const courses = await this.prismaService.course.findMany({
      include: {
        teacher: true,
        fields: true,
      },
    });
    return {
      status: HttpStatus.OK,
      courses,
    };
  }

  async findOne(id: number) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        fields: true,
      },
    });
    return {
      status: HttpStatus.OK,
      course,
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.prismaService.course.update({
      where: { id },
      data: {
        ...updateCourseDto,
        teacher: {
          connect: {
            id: updateCourseDto.teacher,
          },
        },
        fields: {
          set: updateCourseDto.fields.map((field) => ({ id: field })),
        },
      },
    });
    return {
      status: HttpStatus.OK,
      message: 'Le cours a été modifié avec succès',
    };
  }

  async remove(id: number) {
    await this.prismaService.course.delete({
      where: { id },
    });
    return {
      status: HttpStatus.OK,
      message: 'Le cours a été supprimé avec succès',
    };
  }
}
