import { HttpStatus, Injectable } from '@nestjs/common';
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
        message: 'Course created successfully',
      };
    } catch {
      return {
        status: 400,
        message: 'Course created failed',
      };
    }
  }

  async findAll() {
    try {
      const courses: Course[] = await this.courseRepository.find({
        order: { id: 'ASC' },
      });
      return {
        status: HttpStatus.OK,
        courses,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Aucun cours trouvé.',
      };
    }
  }

  async findOne(id: number) {
    try {
      const course: Course = await this.courseRepository.findOneOrFail({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        course,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de trouver le cours.',
      };
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course: Course = await this.courseRepository.findOneOrFail({
        where: { id },
      });
      await this.courseRepository.save({
        ...course,
        ...updateCourseDto,
      });
      return {
        status: HttpStatus.OK,
        message: 'Le cours a été mis à jour avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de mettre à jour le cours.',
      };
    }
  }

  async remove(id: number) {
    try {
      await this.courseRepository.delete({ id });
      return {
        status: HttpStatus.OK,
        message: 'Le cours a été supprimé avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de supprimer le cours.',
      };
    }
  }
}
