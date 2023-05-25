import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';

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
        message: 'La filière a bien été créé.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "La filière n'a pas pu être créé.",
      };
    }
  }

  async findAll() {
    try {
      const fields: Field[] = await this.fieldRepository.find({
        order: { id: 'ASC' },
        relations: ['faculty'],
      });
      return {
        status: HttpStatus.OK,
        fields,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Les filières n'ont pas pu être récupérées.",
      };
    }
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
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "La filière n'a pas pu être récupérée.",
      };
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
        message: 'La filière a bien été modifiée.',
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "La filière n'a pas pu être modifiée.",
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}
