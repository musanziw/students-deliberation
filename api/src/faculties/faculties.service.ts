import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity';

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
        message: 'La faculté créée avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de créer la faculté.',
      };
    }
  }

  async findAll() {
    try {
      const faculties = await this.facultyRepository.find({
        order: { id: 'ASC' },
        relations: ['fields'],
      });
      return {
        status: HttpStatus.OK,
        faculties,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de récupérer les facultés.',
      };
    }
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
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de récupérer la faculté.',
      };
    }
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    try {
      await this.facultyRepository.update({ id }, updateFacultyDto);
      return {
        status: HttpStatus.OK,
        message: 'La faculté a bien été mise à jour.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de mettre à jour la faculté.',
      };
    }
  }

  async remove(id: number) {
    try {
      await this.facultyRepository.delete({ id });
      return {
        status: HttpStatus.OK,
        message: 'La faculté a bien été supprimée.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de supprimer la faculté.',
      };
    }
  }
}
