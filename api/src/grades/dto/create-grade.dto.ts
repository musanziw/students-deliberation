import { IsNumber, IsOptional, Max } from 'class-validator';

export class CreateGradeDto {
  @IsNumber({}, { message: 'La note annuelle est requise' })
  @Max(20, { message: 'La note annuelle doit être inférieure à 20' })
  average: number;

  @IsNumber({}, { message: 'La session est requise' })
  session: number;

  @IsNumber({}, { message: 'Le cours est requis' })
  course: number;

  @IsNumber({}, { message: "La promotion de l'étudiant est requise" })
  student_promotion: number;

  @IsOptional()
  equalized_average: number;

  @IsNumber({}, { message: "L'étudiant est requis" })
  student: number;
}
