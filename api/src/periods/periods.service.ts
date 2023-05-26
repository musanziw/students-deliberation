import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeriodsService {
  constructor(
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  async create(createPeriodDto: CreatePeriodDto) {
    try {
      await this.periodRepository.save(createPeriodDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Période créée avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de créer la période.',
      };
    }
  }

  async findAll() {
    try {
      const periods = await this.periodRepository.find({
        order: { id: 'ASC' },
      });
      return {
        status: HttpStatus.OK,
        message: 'Périodes récupérées avec succès.',
        periods,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de récupérer les périodes.',
      };
    }
  }

  async findOne(id: number) {
    try {
      const period = await this.periodRepository.findOneOrFail({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        message: 'Période récupérée avec succès.',
        period,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de récupérer la période.',
      };
    }
  }

  async update(id: number, updatePeriodDto: UpdatePeriodDto) {
    try {
      await this.periodRepository.update(id, updatePeriodDto);
      return {
        status: HttpStatus.OK,
        message: 'Période modifiée avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de modifier la période.',
      };
    }
  }

  async remove(id: number) {
    try {
      await this.periodRepository.delete({ id });
      return {
        status: HttpStatus.OK,
        message: 'Période supprimée avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de supprimer la période.',
      };
    }
  }
}
