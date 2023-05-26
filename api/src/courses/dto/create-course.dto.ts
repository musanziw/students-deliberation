import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'Le nom du cours est requis.' })
  name: string;

  @IsNumber({}, { message: "Le nombre d'heures est requis." })
  hours: number;

  @IsNumber({}, { message: 'Le nombre de crédits est requis.' })
  credit: number;

  @IsObject({ message: 'Le professeur est requis.' })
  user: { id: number };

  @IsObject({ message: 'La promotion est requise.' })
  promotion: { id: number };

  @IsObject({ message: 'La période est requise.' })
  period: { id: number };
}
