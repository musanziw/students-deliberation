import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliberationService {
  private TERMINALS: number[] = [2, 4];

  constructor(private prismaService: PrismaService) {}

  getAverageGrade = (sum: number, attemptedCredits: number) =>
    sum / attemptedCredits;

  getEarnedCredits(grades: any[]) {
    return grades.reduce(
      (acc, grade) =>
        acc +
        (grade.equalized_average || grade.average >= 10
          ? grade.course.credits
          : 0),
      0,
    );
  }

  getAttemptedCredits(grades: any[]) {
    return grades.reduce((acc, grade) => acc + grade.course.credits, 0);
  }

  getTotalGrades(grades: any[]) {
    return grades.reduce(
      (acc, grade) =>
        acc +
        (grade.equalized_average ? grade.equalized_average : grade.average) *
          grade.course.credits,
      0,
    );
  }

  getFailedCourses(grades: any[]) {
    return grades
      .filter((grade) => grade.average < 10 && !grade.equalized_average)
      .map((grade) => grade.course);
  }

  getStudentLevels(grades: any[]) {
    return [...new Set(grades.map((grade) => grade.student_promotion))];
  }

  filterGrades(grades: any[]) {
    return grades.filter((grade) => {
      const sameGrades = grades.filter(
        (g) =>
          g.course.id === grade.course.id &&
          g.student_promotion === grade.student_promotion,
      );
      return Math.max(...sameGrades.map((g) => g.session)) === grade.session;
    });
  }

  async markAsSucceded(student: any, studentLevel: number) {
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

  async markAsSuccededWith(student: any, courses: any[]) {
    const studentLevel = Math.max(...this.getStudentLevels(student.grades));
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

  async markAsFailed(student: any, courses: any[]) {
    await this.prismaService.student.update({
      where: { id: student.id },
      data: {
        courses: {
          set: courses.map((course) => ({ id: course.id })),
        },
      },
    });
  }

  getStudent(studentId: number) {
    return this.prismaService.student.findUnique({
      where: { id: studentId },
      include: {
        grades: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  async mention(studentId: number, grades: any[], courses: any[]) {
    const student = await this.getStudent(studentId);
    const studentLevel = Math.max(...this.getStudentLevels(student.grades));
    const attemptedCredits = this.getAttemptedCredits(grades);
    const earnedCredits = this.getEarnedCredits(grades);
    const sum = this.getTotalGrades(grades);
    const average = this.getAverageGrade(sum, attemptedCredits);

    if (earnedCredits === attemptedCredits) {
      await this.markAsSucceded(student, studentLevel);
      if (average >= 16) return 'PGD';
      if (average >= 14) return 'PD';
      if (average >= 10) return 'PS';
    }

    if (earnedCredits >= 45) {
      if (courses.length <= 3 && !this.TERMINALS.includes(studentLevel)) {
        await this.markAsSuccededWith(student, courses);
        return `PC${courses.length}`;
      }

      if (this.TERMINALS.includes(studentLevel) && courses.length <= 1) {
        await this.markAsSuccededWith(student, courses);
        return `PC${courses.length}`;
      }
    }

    await this.markAsFailed(student, courses);
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
    const levels: number[] = this.getStudentLevels(grades);
    const filteredGrades = this.filterGrades(grades);
    return levels.map((level) =>
      filteredGrades.filter((grade) => {
        return grade.student_promotion === level;
      }),
    );
  }

  async getStudentReport(studentId: number, grades: any[]) {
    const attemptedCredits = this.getAttemptedCredits(grades);
    const earnedCredits = this.getEarnedCredits(grades);
    const sum = this.getTotalGrades(grades);
    const failedCourses = this.getFailedCourses(grades);
    const mention = await this.mention(studentId, grades, failedCourses);
    return {
      attemptedCredits,
      earnedCredits,
      percentage: ((sum / attemptedCredits) * 100) / 20,
      mention,
      level: grades[0].student_promotion,
      grades,
    };
  }

  async getDeliberatedGrades(id: number) {
    const gradesByLevel = await this.getGrades(id);
    const deliberatedGrades = gradesByLevel.map((grades) =>
      this.getStudentReport(id, grades),
    );
    return {
      status: HttpStatus.OK,
      grades: await Promise.all(deliberatedGrades),
    };
  }
}
