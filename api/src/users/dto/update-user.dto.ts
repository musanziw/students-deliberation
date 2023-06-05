import { IsArray, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Le prénom doit être une chaîne de caractères.' })
  firstname: string;

  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  lastname: string;

  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères.",
  })
  name: string;

  @IsArray({ message: 'Les rôles doivent être un tableau de rôles.' })
  roles: any[];
}
