import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SigninDto, UpdatePasswordDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { GetUser } from './decorator';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { roles: true },
    });
    const isMatch: boolean = await bcrypt.compare(password, user?.password);
    if (!user || !isMatch)
      throw new HttpException(
        'Aucun utilisateur trouvé.',
        HttpStatus.NOT_FOUND,
      );
    const payload = { sub: user.id, email: user.email, role: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(@GetUser() user) {
    const { sub: id } = user;
    const data = await this.prismaService.user.findUnique({
      where: { id },
    });
    return {
      status: HttpStatus.OK,
      user: data,
    };
  }

  async updateProfile(@GetUser() user, updateProfileDto: UpdateProfileDto) {
    const { sub: id } = user;
    await this.prismaService.user.update({
      where: { id },
      data: updateProfileDto,
    });
    return {
      status: HttpStatus.OK,
      message: 'Le profil a été mis à jour avec succès',
    };
  }

  async updatePassword(@GetUser() user, updatePasswordDto: UpdatePasswordDto) {
    const { sub: id } = user;
    const data = await this.prismaService.user.findUnique({
      where: { id },
    });
    const { oldPassword, newPassword } = updatePasswordDto;
    const isMatch: boolean = await bcrypt.compare(oldPassword, data?.password);
    if (!isMatch)
      throw new HttpException(
        "L'ancien mot de passe est incorrect",
        HttpStatus.BAD_REQUEST,
      );
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await this.prismaService.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return {
      status: HttpStatus.OK,
      message: 'Le mot de passe a été mis à jour avec succès',
    };
  }
}
