import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'Le nom du cours est requis' })
  name: string;

  @IsNumber({}, { message: "Le nombre d'heures est requis" })
  hours: number;

  @IsNumber({}, { message: 'Le nombre de crédits est requis' })
  credits: number;

  @IsNumber({}, { message: 'La promotion est requise' })
  promotion: number;

  @IsNumber({}, { message: 'Le professeur est requis' })
  teacher: number;

  @IsArray({ message: 'Les filières sont requises' })
  fields: number[];
}
