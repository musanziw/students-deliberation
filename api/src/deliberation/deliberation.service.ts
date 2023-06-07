import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliberationService {
  constructor(private prismaService: PrismaService) {}

  calculatePercentage(grades: any[]) {
    const sum = this.calculateSum(grades);
    const { attemptedCredits } = this.calculateCredits(grades);
    return ((sum / attemptedCredits) * 100) / 20;
  }

  calculateSum(grades: any[]) {
    return grades.reduce(
      (acc, grade) =>
        acc +
        (grade.equalized_average ? grade.equalized_average : grade.average) *
          grade.course.credits,
      0,
    );
  }

  calculateCredits(grades: any[]) {
    const attemptedCredits = grades.reduce(
      (acc, grade) => acc + grade.course.credits,
      0,
    );
    const earnedCredits = grades.reduce(
      (acc, grade) =>
        acc +
        (grade.equalized_average || grade.average >= 10
          ? grade.course.credits
          : 0),
      0,
    );
    return { earnedCredits, attemptedCredits };
  }

  calculateFailedGrades(grades: any[]) {
    const failedGrades = grades.filter(
      (grade) => grade.average < 10 && !grade.equalized_average,
    );
    return failedGrades.length;
  }

  mention(
    earnedCredits: number,
    attemptedCredits: number,
    sum: number,
    failedGrades?: number,
  ): string {
    const average = sum / attemptedCredits;
    if (earnedCredits === attemptedCredits) {
      if (average >= 16) return 'PGD';
      if (average >= 14) return 'PD';
      if (average >= 10) return 'PS';
    }
    if (earnedCredits >= 45) return `PC${failedGrades}`;
    if (failedGrades > 3) return 'R';
  }

  getLevels(grades: any[]) {
    return [...new Set(grades.map((grade) => grade.student_promotion))];
  }

  filterGrades(grades: any[]) {
    return grades.filter((grade) => {
      const someGrgrades = grades.filter(
        (g) =>
          g.course.id === grade.course.id &&
          g.student_promotion === grade.student_promotion,
      );
      return Math.max(...someGrgrades.map((g) => g.session)) === grade.session;
    });
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

    const filteredGrades = this.filterGrades(grades);
    return levels.map((level) =>
      filteredGrades.filter((grade) => {
        return grade.student_promotion === level;
      }),
    );
  }

  report(grades: any[]) {
    const percentage = this.calculatePercentage(grades);
    const { attemptedCredits, earnedCredits } = this.calculateCredits(grades);
    const sum = this.calculateSum(grades);
    const failedGrades = this.calculateFailedGrades(grades);
    const mention = this.mention(
      earnedCredits,
      attemptedCredits,
      sum,
      failedGrades,
    );
    return {
      percentage,
      mention,
      level: grades[0].student_promotion,
      grades,
    };
  }

  async deliberate(id: number) {
    const gradesByLevel = await this.getGrades(id);
    const deliberatedGrades = gradesByLevel.map((grades) =>
      this.report(grades),
    );
    return {
      status: HttpStatus.OK,
      deliberatedGrades,
    };
  }
}
