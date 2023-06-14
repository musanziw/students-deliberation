import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PdfService } from '../pdf/pdf.service';
import { StudentReportType } from './types';
import { course, grade } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class DeliberationService {
  private TERMINALS: number[] = [2, 4];

  constructor(
    private prismaService: PrismaService,
    private pdfService: PdfService,
    private mailerService: MailerService,
  ) {}

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

  async markAsFailed(student: any, courses: course[]) {
    await this.prismaService.student.update({
      where: { id: student.id },
      data: {
        courses: {
          set: courses.map((course) => ({ id: course.id })),
        },
      },
    });
  }

  getTotalHours(grades: any[]) {
    return grades.reduce((acc, grade) => acc + grade.course.hours, 0);
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
        field: true,
      },
    });
  }

  async mention(studentId: number, grades: grade[], courses: course[]) {
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

  async createPdfReport(data: any) {
    return await this.pdfService.createPDF(data);
  }

  async getStudentReport(studentId: number, grades: any[]) {
    const attemptedCredits: number = this.getAttemptedCredits(grades);
    const earnedCredits: number = this.getEarnedCredits(grades);
    const sum: number = this.getTotalGrades(grades);
    const failedCourses: any[] = this.getFailedCourses(grades);
    const totalHours: number = this.getTotalHours(grades);
    const mention: string = await this.mention(
      studentId,
      grades,
      failedCourses,
    );

    const student: any = await this.getStudent(studentId);

    const studentReport: StudentReportType = {
      name: student.name,
      matricule: student.personal_number,
      promotion: student.promotion,
      field: student.field.name,
      courses: grades.map((grade) => ({
        name: grade.course.name,
        grade: grade.equalized_average
          ? grade.equalized_average
          : grade.average,
        credits: grade.course.credits,
      })),
      percentage: ((sum / attemptedCredits) * 100) / 20,
      mention,
      earnedCredits,
      attemptedCredits,
      totalHours,
      failures: failedCourses.length,
    };
    await this.createPdfReport(studentReport);

    return {
      attemptedCredits,
      earnedCredits,
      totalHours,
      percentage: ((sum / attemptedCredits) * 100) / 20,
      mention,
      promotion: grades[0].student_promotion,
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

  async sendReportToStudent(id: number, level: number) {
    const student = await this.getStudent(id);
    await this.mailerService.sendMail({
      to: student.email,
      subject: 'Rapport de notes',
      attachments: [
        {
          filename: `${student.name}-${student.field.name}-${level}.pdf`,
          path: `src/pdf/documents/${student.name}-${student.field.name}-${level}.pdf`,
          content: 'Bienvenue sur notre plateforme de gestion des notes',
          contentType: 'application/pdf',
        },
      ],
    });
  }
}
