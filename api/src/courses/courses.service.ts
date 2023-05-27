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
    const course = await this.courseRepository.save(createCourseDto);
    if (!course)
      throw new HttpException(
        'Impossible de créer le cours',
        HttpStatus.BAD_REQUEST,
      );
    return {
      status: 201,
      message: 'Le cours a été créé avec succès.',
    };
  }

  async findAll() {
    const courses: Course[] = await this.courseRepository.find({
      order: { id: 'ASC' },
      relations: ['period', 'user', 'promotion'],
    });
    return {
      status: HttpStatus.OK,
      courses,
    };
  }

  async findOne(id: number) {
    const course: Course = await this.courseRepository.findOneOrFail({
      where: { id },
      relations: ['period', 'user', 'promotion'],
    });
    if (!course)
      throw new HttpException(
        'Impossible de trouver le cours',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      course,
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course: Course = await this.courseRepository.findOneBy({ id });
    if (!course)
      throw new HttpException(
        'Impossible de trouver le cours',
        HttpStatus.NOT_FOUND,
      );
    await this.courseRepository.save({
      ...course,
      ...updateCourseDto,
    });
    return {
      status: HttpStatus.OK,
      message: 'Le cours a été mis à jour avec succès.',
    };
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
      message: 'Le cours a été supprimé avec succès.',
    };
  }
}
