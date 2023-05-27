import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt: string = await bcrypt.genSalt(10);
      const password: string = await bcrypt.hash(
        this.config.get('DEFAULT_PASSWORD'),
        salt,
      );
      await this.userRepository.save({
        ...createUserDto,
        password,
      });
      return {
        status: HttpStatus.CREATED,
        message: "L'utilisateur a bien été créé",
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Erreur lors de la création de l'utilisateur",
      };
    }
  }

  async findAll() {
    const users: User[] = await this.userRepository.find({
      relations: ['roles'],
      order: { id: 'ASC' },
    });
    return {
      status: HttpStatus.OK,
      users,
    };
  }

  async findOne(id: number) {
    try {
      const user: User = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles'],
      });
      return {
        status: HttpStatus.OK,
        user,
      };
    } catch {
      return {
        status: HttpStatus.NOT_FOUND,
        message: "L'utilisateur n'a pas pu être récupéré",
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user: User = await this.userRepository.findOneOrFail({
        where: { id },
      });
      await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });
      return {
        status: HttpStatus.OK,
        message: "L'utilisateur a bien été mis à jour",
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "L'utilisateur n'a pas pu être mis à jour",
      };
    }
  }

  async remove(id: number) {
    const deleteResult = await this.userRepository.delete({
      id,
    });
    if (!deleteResult.affected)
      throw new HttpException(
        "L'utilisateur n'a pas pu être supprimé",
        HttpStatus.BAD_REQUEST,
      );
    return {
      status: HttpStatus.OK,
      message: "L'utilisateur a bien été supprimé",
    };
  }
}
