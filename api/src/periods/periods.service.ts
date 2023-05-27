import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';
import { Repository } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/browser';

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
      throw new HttpException(
        'Impossible de créer la période',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const periods: Period[] = await this.periodRepository.find({
      order: { started_at: 'DESC' },
    });
    return {
      status: HttpStatus.OK,
      periods,
    };
  }

  async findOne(id: number) {
    try {
      const period: Period = await this.periodRepository.findOneOrFail({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        period,
      };
    } catch {
      throw new HttpException(
        'Impossible de récupérer la période',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updatePeriodDto: UpdatePeriodDto) {
    const updateResult: UpdateResult = await this.periodRepository.update(
      { id },
      updatePeriodDto,
    );
    if (!updateResult.affected)
      throw new HttpException(
        'Impossible de mettre à jour la période',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'Période modifiée avec succès',
    };
  }

  async remove(id: number) {
    const deleteResult: DeleteResult = await this.periodRepository.delete({
      id,
    });
    if (!deleteResult.affected)
      throw new HttpException(
        'Impossible de supprimer la période',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'Période supprimée avec succès',
    };
  }
}
