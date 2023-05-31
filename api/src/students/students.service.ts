import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/studient.entity';
import { DataSource, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Grade } from '../grades/entities/grade.entity';

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

  async getGrades(id: number) {
    const grades = await this.dataSource.manager
      .createQueryBuilder(Grade, 'grade')
      .leftJoinAndSelect('grade.course', 'course')
      .leftJoinAndSelect('grade.session', 'session')
      .where('studentId = :id', { id })
      .getMany();

    const levels: number[] = [
      ...new Set(grades.map((grade) => grade.student_level)),
    ];

    const gradesByLevel: Grade[][] = levels.map((level) =>
      grades.filter((grade) => {
        return grade.student_level === level;
      }),
    );

    const pourcentages: number[] = gradesByLevel.map((grades) =>
      this.calculatePercentage(grades),
    );

    return {
      status: HttpStatus.OK,
      grades: gradesByLevel,
      pourcentages,
    };
  }
}
