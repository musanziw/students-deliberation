import { IsArray, IsEmail, IsString } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @IsString({ message: 'Le prénom doit être une chaîne de caractères.' })
  firstname: string;

  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  lastname: string;

  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères.",
  })
  name: string;

  @IsEmail(
    {},
    { message: "L'adresse email doit être une adresse email valide." },
  )
  email: string;

  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  password: string;

  @IsArray({ message: 'Les rôles doivent être un tableau de rôles.' })
  roles: Role[];
}
