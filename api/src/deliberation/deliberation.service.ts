import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliberationService {
  SPECIAL_PROMOTIONS: number[] = [2, 4];

  constructor(private prismaService: PrismaService) {}

  reportDetails(grades: any[]) {
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
    const sum = grades.reduce(
      (acc, grade) =>
        acc +
        (grade.equalized_average ? grade.equalized_average : grade.average) *
          grade.course.credits,
      0,
    );

    const failedCourses = grades
      .filter((grade) => grade.average < 10 && !grade.equalized_average)
      .map((grade) => grade.course);

    return { earnedCredits, attemptedCredits, sum, failedCourses };
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

  async succeeded(student: any, studentLevel: number) {
    await this.prismaService.student.update({
      where: { id: student.id },
      data: {
        promotion: studentLevel + 1,
        courses: {
          set: [],
        },
      },
    });
  }

  async succeededWith(student: any, courses: any[]) {
    const studentLevel = Math.max(...this.getLevels(student.grades));
    await this.prismaService.student.update({
      where: { id: student.id },
      data: {
        promotion: studentLevel + 1,
        courses: {
          set: courses.map((course) => ({ id: course.id })),
        },
      },
    });
  }

  async failed(student: any, courses: any[]) {
    await this.prismaService.student.update({
      where: { id: student.id },
      data: {
        courses: {
          set: courses.map((course) => ({ id: course.id })),
        },
      },
    });
  }

  async decision(studentId: number, grades: any[], courses: any[]) {
    const student = await this.prismaService.student.findUnique({
      where: { id: studentId },
      include: {
        grades: true,
      },
    });
    const studentLevel = Math.max(...this.getLevels(student.grades));
    const { attemptedCredits, earnedCredits, sum } = this.reportDetails(grades);
    const average = sum / attemptedCredits;
    if (earnedCredits === attemptedCredits) {
      await this.succeeded(student, studentLevel);
      if (average >= 16) return 'PGD';
      if (average >= 14) return 'PD';
      if (average >= 10) return 'PS';
    }
    if (
      earnedCredits >= 45 &&
      courses.length <= 3 &&
      !this.SPECIAL_PROMOTIONS.includes(studentLevel)
    ) {
      await this.succeededWith(student, courses);
      return `PC${courses.length}`;
    }
    await this.failed(student, courses);
    return `R${courses.length}`;
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

  async deliberation(studentId: number, grades: any[]) {
    const { attemptedCredits, sum, failedCourses } = this.reportDetails(grades);
    const mention = await this.decision(studentId, grades, failedCourses);
    return {
      percentage: ((sum / attemptedCredits) * 100) / 20,
      mention,
      level: grades[0].student_promotion,
      grades,
    };
  }

  async report(id: number) {
    const gradesByLevel = await this.getGrades(id);
    const deliberatedGrades = gradesByLevel.map((grades) =>
      this.deliberation(id, grades),
    );
    return {
      status: HttpStatus.OK,
      grades: await Promise.all(deliberatedGrades),
    };
  }
}
