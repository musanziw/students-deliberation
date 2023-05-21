import { Injectable } from '@nestjs/common';
import { CreateStudientDto } from './dto/create-studient.dto';
import { UpdateStudientDto } from './dto/update-studient.dto';

@Injectable()
export class StudientsService {
  create(createStudientDto: CreateStudientDto) {
    return 'This action adds a new studient';
  }

  findAll() {
    return `This action returns all studients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studient`;
  }

  update(id: number, updateStudientDto: UpdateStudientDto) {
    return `This action updates a #${id} studient`;
  }

  remove(id: number) {
    return `This action removes a #${id} studient`;
  }
}
