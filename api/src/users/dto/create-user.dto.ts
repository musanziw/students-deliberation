import { IsArray, IsEmail, IsString } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @IsString({ message: 'Le prénom est requis.' })
  firstname: string;

  @IsString({ message: 'Le nom doit est requis.' })
  lastname: string;

  @IsString({
    message: 'Le nom est requis.',
  })
  name: string;

  @IsEmail(
    {},
    { message: "L'adresse email doit être une adresse email valide." },
  )
  email: string;

  @IsArray({ message: 'Les rôles doivent être rôles valides.' })
  roles: Role[];
}
