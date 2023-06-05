import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { UpdateProfileDto } from '../auth/dto/update-profile.dto';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UpdatePasswordDto } from '../auth/dto';

@Injectable()
export class UsersService {
  constructor(private config: ConfigService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt: string = await bcrypt.genSalt(10);
      const password: string = await bcrypt.hash(
        this.config.get('DEFAULT_PASSWORD'),
        salt,
      );
      // await this.userRepository.save({
      //   ...createUserDto,
      //   password,
      // });
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

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateUserDto: UpdateUserDto) {}

  async remove(id: number) {}

  async updateProfile(id: number, updateUserInfoDto: UpdateProfileDto) {}

  async updatePassword(id: number, { newPassword }: UpdatePasswordDto) {}

  async findByEmail(email: string) {}
}
