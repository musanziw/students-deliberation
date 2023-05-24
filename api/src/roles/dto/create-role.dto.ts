import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Le nom du rôle doit être une chaîne de caractères.' })
  name;
}
