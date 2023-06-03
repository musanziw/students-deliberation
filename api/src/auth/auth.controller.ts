import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Public } from './guard';
import { SigninDto, UpdatePasswordDto } from './dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller()
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Get('profile')
  profile(@Req() req) {
    return this.authService.profile(req);
  }

  @Patch('profile')
  updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(req, updateProfileDto);
  }

  @Patch('update-password')
  updatePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(req, updatePasswordDto);
  }
}
