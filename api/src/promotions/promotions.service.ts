import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    try {
      await this.promotionRepository.save(createPromotionDto);
      return {
        status: HttpStatus.CREATED,
        message: 'La promotion a été créée avec succès',
      };
    } catch {
      throw new HttpException(
        'Une erreur est survenue lors de la création de la promotion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const promotions: Promotion[] = await this.promotionRepository.find({
      order: { id: 'ASC' },
      relations: ['field'],
    });
    return {
      status: HttpStatus.OK,
      promotions,
    };
  }

  async findOne(id: number) {
    try {
      const promotion: Promotion = await this.promotionRepository.findOneOrFail(
        {
          where: { id },
          relations: ['field'],
        },
      );
      return {
        status: HttpStatus.OK,
        promotion,
      };
    } catch {
      throw new HttpException(
        'La promotion est introuvable',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    try {
      await this.promotionRepository.findOneOrFail({ where: { id } });
      await this.promotionRepository.update({ id }, updatePromotionDto);
      return {
        status: HttpStatus.OK,
        message: 'La promotion a été modifiée avec succès.',
      };
    } catch {
      throw new HttpException(
        'La promotion est introuvable',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number) {
    const deleteResult = await this.promotionRepository.delete({ id });
    if (!deleteResult.affected)
      throw new HttpException(
        'La promotion est introuvable',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'La promotion a été supprimée avec succès.',
    };
  }
}
