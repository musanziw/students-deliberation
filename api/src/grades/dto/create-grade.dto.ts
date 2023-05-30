import { IsNumber, IsObject, Max } from 'class-validator';

export class CreateGradeDto {
  @IsNumber({}, { message: 'La note annuelle est requise' })
  @Max(20, { message: 'La note annuelle doit être inférieure à 20' })
  average;

  @IsNumber({}, { message: 'La note du premier semestre est requise' })
  studient_level;

  @IsObject({ message: 'Le cours est requis' })
  course: { id: number };

  @IsObject({ message: 'La session est requise' })
  session: { id: number };

  @IsObject({ message: "L'étudiant est requis" })
  student: { id: number };
}
