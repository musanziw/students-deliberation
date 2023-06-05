import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Le nom est requis.',
  })
  name: string;

  @IsEmail(
    {},
    { message: "L'adresse email doit être une adresse email valide." },
  )
  email: string;

  @IsArray({ message: 'Les rôles doivent être des rôles valides.' })
  role: any[];
}
