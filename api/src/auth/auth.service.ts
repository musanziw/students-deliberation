import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user: User = await this.usersService.findByEmail(email);
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!user || !isMatch)
      throw new HttpException(
        'Aucun utilisateur trouvé, veuillez vérifier vos identifiants',
        HttpStatus.NOT_FOUND,
      );
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(@Req() req) {
    const { id } = req.user;
    const { user } = await this.usersService.profile(id);
    return {
      status: HttpStatus.OK,
      user,
    };
  }

  async updateProfile(@Req() req, updateUserInfoDto: UpdateProfileDto) {
    const { id } = req.user;
    return await this.usersService.updateProfile(id, updateUserInfoDto);
  }

  async updatePassword(@Req() req, updatePasswordDto: UpdatePasswordDto) {
    const { id } = req.user;
    return await this.usersService.updatePassword(id, updatePasswordDto);
  }
}
