import { IsObject, IsString } from 'class-validator';

export class CreateFieldDto {
  @IsString({ message: 'Le nom est requis.' })
  name: string;

  @IsObject({ message: 'La faculté est requise.' })
  faculty: { id: number };
}
