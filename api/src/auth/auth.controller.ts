import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from './guard/auth.guard';
import { Public } from './guard/public.guard';

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

  @Post('update-profile')
  updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(req, updateProfileDto);
  }

  @Post('update-password')
  updatePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(req, updatePasswordDto);
  }
}
