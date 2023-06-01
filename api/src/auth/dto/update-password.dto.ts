import { MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  @MaxLength(20, {
    message: 'Le mot de passe doit contenir au plus 20 caractères',
  })
  newPassword: string;
}
