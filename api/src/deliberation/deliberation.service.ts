import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliberationService {
  constructor(private prismaService: PrismaService) {}

  calculatePercentage(grades: any[]) {
    const sum = grades.reduce(
      (acc, grade) =>
        acc +
        ((grade.equalized_average ? grade.equalized_average : grade.average) /
          20) *
          grade.course.credits,
      0,
    );
    const creditAttempt = grades.reduce(
      (acc, grade) => acc + grade.course.credits,
      0,
    );
    return (sum / creditAttempt) * 100;
  }

  getLevels(grades: any[]) {
    return [...new Set(grades.map((grade) => grade.student_promotion))];
  }

  async getGrades(id: number) {
    const grades = await this.prismaService.grade.findMany({
      where: {
        student: { id },
      },
      include: {
        course: true,
      },
    });

    const levels: number[] = this.getLevels(grades);

    return levels.map((level) =>
      grades.filter((grade) => {
        return grade.student_promotion === level;
      }),
    );
  }

  deliberated(grades: any[]) {
    const percentage = this.calculatePercentage(grades);
    return {
      percentage,
      level: grades[0].student_promotion,
      grades,
    };
  }

  async deliberate(id: number) {
    const gradesByLevel = await this.getGrades(id);
    const deliberatedGrades = gradesByLevel.map((grades) =>
      this.deliberated(grades),
    );
    return {
      status: HttpStatus.OK,
      deliberatedGrades,
    };
  }
}
