import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    try {
      await this.gradeRepository.save(createGradeDto);
      return {
        status: HttpStatus.CREATED,
        message: 'La note a bien été créée',
      };
    } catch {
      throw new HttpException(
        'Impossible de créer la note',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const grades = await this.gradeRepository.find({
      order: { id: 'ASC' },
      relations: ['student', 'course'],
    });
    return {
      status: HttpStatus.OK,
      grades,
    };
  }

  async findOne(id: number) {
    try {
      const grade = await this.gradeRepository.findOneOrFail({
        where: { id },
        relations: ['student', 'course'],
      });
      return {
        status: HttpStatus.OK,
        grade,
      };
    } catch {
      throw new HttpException(
        'Impossible de trouver la note',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    try {
      const grade = await this.gradeRepository.findOneOrFail({
        where: { id },
      });
      await this.gradeRepository.save({ ...grade, ...updateGradeDto });
      return {
        status: HttpStatus.OK,
        message: 'La note a bien été mise à jour',
      };
    } catch {
      throw new HttpException(
        'Impossible de mettre à jour la note',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    const deleteResult = await this.gradeRepository.delete({ id });
    if (!deleteResult.affected) {
      throw new HttpException(
        'Impossible de supprimer la note',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      status: HttpStatus.OK,
      message: 'La note a bien été supprimée',
    };
  }
}
