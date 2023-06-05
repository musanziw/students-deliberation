import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacultyDto, UpdateFacultyDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacultiesService {
  constructor(private prismaService: PrismaService) {}

  async create(createFacultyDto: CreateFacultyDto) {
    try {
      await this.prismaService.faculty.create({
        data: createFacultyDto,
      });
      return {
        status: HttpStatus.OK,
        message: 'La faculté a bien été créée',
      };
    } catch {
      throw new HttpException(
        'Faculty with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const faculties = await this.prismaService.faculty.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return {
        status: HttpStatus.OK,
        faculties,
      };
    } catch {
      throw new HttpException('Aucune faculté trouvée', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number) {
    try {
      const faculty = await this.prismaService.faculty.findUnique({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        faculty,
      };
    } catch {
      throw new HttpException('Faculté non trouvée', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    try {
      await this.prismaService.faculty.update({
        where: { id },
        data: updateFacultyDto,
      });
      return {
        status: HttpStatus.OK,
        message: 'La faculté a bien été mise à jour',
      };
    } catch {
      throw new HttpException(
        "La faculté n'a pas pu être mise à jour",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.faculty.delete({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        message: 'La faculté a bien été supprimée',
      };
    } catch {
      throw new HttpException(
        "La faculté n'a pas pu être supprimée",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
