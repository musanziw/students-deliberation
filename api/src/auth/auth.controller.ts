import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Public } from './guard';
import { SigninDto, UpdatePasswordDto } from './dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from './decorator';

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
  profile(@GetUser() user) {
    return this.authService.profile(user);
  }

  @Patch('profile')
  updateProfile(@GetUser() user, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(user, updateProfileDto);
  }

  @Patch('update-password')
  updatePassword(
    @GetUser() user,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.authService.updatePassword(user, updatePasswordDto);
  }
}
