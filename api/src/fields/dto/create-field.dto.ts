import { IsNumber, IsString } from 'class-validator';

export class CreateFieldDto {
  @IsString({ message: 'Le nom est requis.' })
  name: string;

  @IsNumber({}, { message: 'La faculté est requise.' })
  faculty: number;
}
