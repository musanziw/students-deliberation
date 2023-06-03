import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity';
import { UpdateResult } from 'typeorm/browser';
import { CreateFacultyDto, UpdateFacultyDto } from './dto';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private facultyRepository: Repository<Faculty>,
  ) {}

  async create(createFacultyDto: CreateFacultyDto) {
    try {
      await this.facultyRepository.save(createFacultyDto);
      return {
        status: HttpStatus.CREATED,
        message: 'La faculté créée avec succès',
      };
    } catch {
      throw new HttpException(
        'Impossible de créer la faculté',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const faculties = await this.facultyRepository.find({
      order: { id: 'ASC' },
      relations: ['fields'],
    });
    return {
      status: HttpStatus.OK,
      faculties,
    };
  }

  async findOne(id: number) {
    try {
      const faculty: Faculty = await this.facultyRepository.findOneOrFail({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        faculty,
      };
    } catch {
      throw new HttpException(
        'Impossible de trouver la faculté',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    const updateResult: UpdateResult = await this.facultyRepository.update(
      { id },
      updateFacultyDto,
    );
    if (!updateResult.affected)
      throw new HttpException(
        'Impossible de mettre à jour la faculté',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'La faculté a bien été mise à jour',
    };
  }

  async remove(id: number) {
    const deleteResult = await this.facultyRepository.delete({ id });
    if (!deleteResult.affected)
      throw new HttpException(
        'Impossible de supprimer la faculté',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'La faculté a bien été supprimée',
    };
  }
}
