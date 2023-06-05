import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt: string = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(
      this.config.get('DEFAULT_PASSWORD'),
      salt,
    );
    try {
      await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password,
          roles: {
            connect: createUserDto.roles.map((role) => ({ id: role })),
          },
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: "L'utilisateur a bien été créé",
      };
    } catch {
      throw new HttpException(
        "Une erreur est survenue lors de la création de l'utilisateur",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      include: {
        roles: true,
      },
    });
    return {
      status: HttpStatus.OK,
      users,
    };
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });
    return {
      status: HttpStatus.OK,
      user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        roles: {
          set: updateUserDto.roles.map((role) => ({ id: role })),
        },
      },
    });
    return {
      status: HttpStatus.OK,
      message: "L'utilisateur a bien été modifié",
    };
  }

  async remove(id: number) {
    await this.prismaService.user.delete({
      where: { id },
    });
    return {
      status: HttpStatus.OK,
      message: "L'utilisateur a bien été supprimé",
    };
  }
}
