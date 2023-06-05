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

  // calculatePercentage(grades: Grade[]) {
  //   const sum = grades.reduce(
  //     (acc, grade) => acc + (grade.average / 20) * grade.course.credit,
  //     0,
  //   );
  //   const creditAttempt = grades.reduce(
  //     (acc, grade) => acc + grade.course.credit,
  //     0,
  //   );
  //   return (sum / creditAttempt) * 100;
  // }
  //
  // getLevels(grades: Grade[]) {
  //   return [...new Set(grades.map((grade) => grade.student_level))];
  // }
  //
  // async getGrades(id: number) {
  //   const grades = await this.dataSource.manager
  //     .createQueryBuilder(Grade, 'grade')
  //     .leftJoinAndSelect('grade.course', 'course')
  //     .leftJoinAndSelect('grade.session', 'session')
  //     .where('studentId = :id', { id })
  //     .getMany();
  //
  //   const levels: number[] = this.getLevels(grades);
  //
  //   return levels.map((level) =>
  //     grades.filter((grade) => {
  //       return grade.student_level === level;
  //     }),
  //   );
  // }
  //
  // deliberated(grades: Grade[]) {
  //   const percentage = this.calculatePercentage(grades);
  //   return {
  //     percentage,
  //     level: grades[0].student_level,
  //     grades,
  //   };
  // }
  //
  // async deliberate(id: number) {
  //   const gradesByLevel = await this.getGrades(id);
  //   const deliberatedGrades = gradesByLevel.map((grades) =>
  //     this.deliberated(grades),
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     deliberatedGrades,
  //   };
  // }
}
