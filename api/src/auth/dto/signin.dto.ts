import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  readonly email: string;

  @IsString({ message: 'Le mot de passe est requis' })
  readonly password: string;
}
