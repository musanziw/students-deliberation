import { IsNumber, IsObject, Max } from 'class-validator';

export class CreateGradeDto {
  @IsNumber({}, { message: 'La note annuelle est requise' })
  @Max(20, { message: 'La note annuelle doit être inférieure à 20' })
  average;

  @IsNumber({}, { message: 'La session est requise' })
  @Max(2, { message: 'La session doit être inférieure à 2' })
  session;

  @IsObject({ message: 'Le cours est requis' })
  course: { id: number };

  @IsObject({ message: "L'étudiant est requis" })
  student: { id: number };
}
