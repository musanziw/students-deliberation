import { HttpStatus, Injectable } from '@nestjs/common';
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
        message: 'Promotion created successfully',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Promotion created failed',
      };
    }
  }

  async findAll() {
    try {
      const promotions = await this.promotionRepository.find({
        order: { id: 'ASC' },
      });
      return {
        status: HttpStatus.OK,
        promotions,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Promotions not found',
      };
    }
  }

  async findOne(id: number) {
    try {
      const promotion: Promotion = await this.promotionRepository.findOneOrFail(
        {
          where: { id },
        },
      );
      return {
        status: HttpStatus.OK,
        promotion,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de trouver la promotion.',
      };
    }
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    try {
      const promotion: Promotion = await this.promotionRepository.findOneOrFail(
        {
          where: { id },
        },
      );
      await this.promotionRepository.save({
        ...promotion,
        ...updatePromotionDto,
      });
      return {
        status: HttpStatus.OK,
        message: 'La promotion a été mise à jour avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de mettre à jour la promotion.',
      };
    }
  }

  async remove(id: number) {
    try {
      await this.promotionRepository.delete({ id });
      return {
        status: HttpStatus.OK,
        message: 'La promotion a été supprimée avec succès.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de supprimer la promotion.',
      };
    }
  }
}
