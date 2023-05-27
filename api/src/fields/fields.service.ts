import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  async create(createFieldDto: CreateFieldDto) {
    try {
      await this.fieldRepository.save(createFieldDto);
      return {
        status: HttpStatus.CREATED,
        message: 'La filière a bien été créée',
      };
    } catch {
      throw new HttpException(
        'Impossible de créer la filière',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const fields: Field[] = await this.fieldRepository.find({
      order: { id: 'ASC' },
      relations: ['faculty'],
    });
    return {
      status: HttpStatus.OK,
      fields,
    };
  }

  async findOne(id: number) {
    try {
      const field: Field = await this.fieldRepository.findOneOrFail({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        field,
      };
    } catch {
      throw new HttpException(
        'Impossible de trouver la filière',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateFieldDto: UpdateFieldDto) {
    try {
      const field: Field = await this.fieldRepository.findOneOrFail({
        where: { id },
      });
      await this.fieldRepository.save({
        ...field,
        ...updateFieldDto,
      });
      return {
        status: HttpStatus.OK,
        message: 'La filière a bien été modifiée',
      };
    } catch {
      throw new HttpException(
        'Impossible de mettre à jour la filière',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number) {
    const deleteResult: DeleteResult = await this.fieldRepository.delete({
      id,
    });
    if (!deleteResult.affected)
      throw new HttpException(
        'Impossible de supprimer la filière',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'La filière a bien été supprimée',
    };
  }
}
