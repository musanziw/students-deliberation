import { IsEmail, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString({ message: 'Le prénom est requis' })
  firstname: string;

  @IsString({ message: 'Le nom doit est requis' })
  lastname: string;

  @IsString({ message: 'Le nom est requis' })
  name: string;

  @IsEmail(
    {},
    { message: "L'adresse email doit être une adresse email valide" },
  )
  email: string;
}
