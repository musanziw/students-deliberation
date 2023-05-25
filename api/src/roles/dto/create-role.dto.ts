import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Le rôle est requis.' })
  name;
}
