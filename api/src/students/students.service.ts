import { Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Injectable()
export class StudentsService {
  constructor() {}

  async create(createStudentDto: CreateStudentDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateStudentDto: UpdateStudentDto) {}

  async remove(id: number) {}

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
