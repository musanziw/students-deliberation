import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from './entities/calendar.entity';
import { Repository } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/browser';

@Injectable()
export class CalendarsService {
  constructor(
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  async create(createPeriodDto: CreateCalendarDto) {
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

  async update(id: number, updatePeriodDto: UpdateCalendarDto) {
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
