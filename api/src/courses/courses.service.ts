import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      await this.courseRepository.save(createCourseDto);
      return {
        status: 201,
        message: 'Le cours a été créé avec succès',
      };
    } catch {
      throw new HttpException(
        'Impossible de créer le cours',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const courses: Course[] = await this.courseRepository.find({
      order: { id: 'ASC' },
      relations: ['user', 'promotion'],
    });
    return {
      status: HttpStatus.OK,
      courses,
    };
  }

  async findOne(id: number) {
    try {
      const course: Course = await this.courseRepository.findOneOrFail({
        where: { id },
        relations: ['period', 'user', 'promotion'],
      });
      return {
        status: HttpStatus.OK,
        course,
      };
    } catch {
      throw new HttpException(
        'Impossible de trouver le cours',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course: Course = await this.courseRepository.findOneBy({ id });
      await this.courseRepository.save({
        ...course,
        ...updateCourseDto,
      });
      return {
        status: HttpStatus.OK,
        message: 'Le cours a été mis à jour avec succès',
      };
    } catch {
      throw new HttpException(
        'Impossible de trouver le cours',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number) {
    const delteResult = await this.courseRepository.delete({ id });
    if (!delteResult.affected)
      throw new HttpException(
        'Impossible de supprimer le cours',
        HttpStatus.BAD_REQUEST,
      );
    return {
      status: HttpStatus.OK,
      message: 'Le cours a été supprimé avec succès',
    };
  }
}
