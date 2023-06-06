import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      await this.prismaService.student.create({
        data: {
          ...createStudentDto,
          field: {
            connect: {
              id: createStudentDto.field,
            },
          },
          courses: {
            connect: createStudentDto.courses.map((course) => ({ id: course })),
          },
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: "L'étudiant a bien été créé",
      };
    } catch {
      throw new HttpException(
        'Un étudiant avec ces identifiants existe déjà',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const students = await this.prismaService.student.findMany({
      include: {
        field: true,
      },
    });
    return {
      status: HttpStatus.OK,
      students,
    };
  }

  async findOne(id: number) {
    const student = await this.prismaService.student.findUnique({
      where: { id },
      include: {
        field: true,
        courses: true,
      },
    });
    return {
      status: HttpStatus.OK,
      student,
    };
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      await this.prismaService.student.update({
        where: { id },
        data: {
          ...updateStudentDto,
          field: {
            connect: {
              id: updateStudentDto.field,
            },
          },
          courses: {
            connect: updateStudentDto.courses.map((course) => ({ id: course })),
          },
        },
      });
      return {
        status: HttpStatus.OK,
        message: "L'étudiant a bien été modifié",
      };
    } catch {
      throw new HttpException(
        "Cette filière n'existe pas",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    await this.prismaService.student.delete({
      where: { id },
    });
    return {
      status: HttpStatus.OK,
      message: "L'étudiant a bien été supprimé",
    };
  }

  async sudentsByPromotion(field: number, promotion: number) {
    const students = await this.prismaService.student.findMany({
      where: {
        promotion: promotion,
        field: {
          id: field,
        },
      },
      include: {
        field: true,
      },
    });
    return {
      status: HttpStatus.OK,
      students,
    };
  }

  async findStudentWithCourses(courseId: number) {
    const student = await this.prismaService.student.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        courses: true,
      },
    });
    const studentWithCourses = student.filter((student) =>
      student.courses.some((course) => course.id === courseId),
    );
    const students = studentWithCourses.map((student) => {
      const courses = student.courses.filter(
        (course) => course.id === courseId,
      );
      return {
        ...student,
        courses,
      };
    });
    return {
      status: HttpStatus.OK,
      students,
    };
  }
}
