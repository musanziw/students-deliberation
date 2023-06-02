import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/studient.entity';
import { DataSource, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Grade } from '../grades/entities/grade.entity';
import { Promotion } from '../promotions/entities/promotion.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    private dataSource: DataSource,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      await this.studentRepository.save(createStudentDto);
      return {
        status: HttpStatus.CREATED,
        message: "L'étudiant a été créé avec succès.",
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Erreur lors de la création de l'étudiant.",
      };
    }
  }

  async findAll() {
    const students = await this.studentRepository.find({
      relations: ['promotion'],
    });
    return {
      status: HttpStatus.OK,
      students,
    };
  }

  async findOne(id: number) {
    try {
      const student = await this.studentRepository.findOneOrFail({
        where: { id },
        relations: ['promotion', 'courses'],
      });
      return {
        status: HttpStatus.OK,
        student,
      };
    } catch {
      throw new HttpException(
        "L'étudiant n'a pas été trouvé",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.studentRepository.findOneOrFail({
        where: { id },
      });
      await this.studentRepository.save({
        ...student,
        ...updateStudentDto,
      });
      return {
        status: HttpStatus.OK,
        message: "L'étudiant a bien été mis à jour",
      };
    } catch {
      throw new HttpException(
        "Erreur lors de la mise à jour de l'étudiant",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const deleteResult: DeleteResult = await this.studentRepository.delete({
      id,
    });
    if (!deleteResult.affected) {
      throw new HttpException(
        "L'étudiant n'a pas été trouvé",
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: HttpStatus.OK,
      message: "L'étudiant a été supprimé avec succès",
    };
  }

  calculatePercentage(grades: Grade[]) {
    const sum = grades.reduce(
      (acc, grade) => acc + (grade.average / 20) * grade.course.credit,
      0,
    );
    const creditAttempt = grades.reduce(
      (acc, grade) => acc + grade.course.credit,
      0,
    );
    return (sum / creditAttempt) * 100;
  }

  getLevels(grades: Grade[]) {
    return [...new Set(grades.map((grade) => grade.student_level))];
  }

  async getGrades(id: number) {
    const grades = await this.dataSource.manager
      .createQueryBuilder(Grade, 'grade')
      .leftJoinAndSelect('grade.course', 'course')
      .leftJoinAndSelect('grade.session', 'session')
      .where('studentId = :id', { id })
      .getMany();

    const levels: number[] = this.getLevels(grades);

    return levels.map((level) =>
      grades.filter((grade) => {
        return grade.student_level === level;
      }),
    );
  }

  deliberated(grades: Grade[]) {
    const percentage = this.calculatePercentage(grades);
    return {
      percentage,
      level: grades[0].student_level,
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

  async succedWith(studentId: number, Grades: Grade[]) {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: studentId },
      relations: ['promotion'],
    });
    const promotion = await this.dataSource.manager
      .createQueryBuilder(Promotion, 'promotion')
      .where('level = :level', { level: student.promotion.level })
      .getOne();
    const failedGrades = Grades.filter((grade) => grade.average < 10);
    const additionalCourse = failedGrades.map((grade) => grade.course);
    student.as_complementary_course = true;
    student.promotion = promotion;
    student.courses = [...student.courses, ...additionalCourse];
    return {
      status: HttpStatus.OK,
      message:
        "L'étudiant a été ajouter à la liste des étudiants ayant des cours supplémentaires",
    };
  }

  async faillure(studentId: number, Grades: Grade[]) {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: studentId },
      relations: ['promotion'],
    });
    const failedGrades = Grades.filter((grade) => grade.average < 10);
    const additionalCourse = failedGrades.map((grade) => grade.course);
    student.as_complementary_course = true;
    student.courses = [...student.courses, ...additionalCourse];
    return {
      status: HttpStatus.OK,
      message:
        "L'étudiant a été ajouter à la liste des étudiants en rattrapage",
    };
  }

  async success(studentId: number) {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: studentId },
      relations: ['promotion'],
    });
    if (student.courses) {
      student.courses = [];
    }
    student.as_complementary_course = false;
    student.promotion = await this.dataSource.manager
      .createQueryBuilder(Promotion, 'promotion')
      .where('level = :level', { level: student.promotion.level + 1 })
      .getOne();
    return {
      status: HttpStatus.OK,
      message: "L'étudiant a été promu avec succès",
    };
  }
}
