import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    try {
      await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });
      return {
        status: HttpStatus.CREATED,
        message: "L'utilisateur a bien été créé.",
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "L'utilisateur n'a pas pu être créé.",
      };
    }
  }

  async findAll() {
    try {
      const users: User[] = await this.userRepository.find({
        relations: ['roles'],
        order: { id: 'ASC' },
      });
      return {
        status: HttpStatus.OK,
        users,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Les utilisateurs n'ont pas pu être récupérés.",
      };
    }
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
        message: "L'utilisateur n'a pas pu être récupéré.",
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
        message: "L'utilisateur a bien été mis à jour.",
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "L'utilisateur n'a pas pu être mis à jour.",
      };
    }
  }

  async remove(id: number) {
    try {
      const user: User = await this.userRepository.findOneOrFail({
        where: { id },
      });
      await this.userRepository.remove(user);
      return {
        status: HttpStatus.OK,
        message: "L'utilisateur a bien été supprimé.",
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "L'utilisateur n'a pas pu être supprimé.",
      };
    }
  }
}
