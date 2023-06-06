import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'Le nom est requis.' })
  name: string;

  @IsEmail({}, { message: "L'email est requis." })
  email: string;

  @IsString({ message: 'Le numéro matricule est requis.' })
  personal_number: string;

  @IsNumber({}, { message: 'La promotion est requise' })
  promotion: number;

  @IsNumber({}, { message: 'Le champ filière est requis.' })
  field: number;

  @IsOptional()
  courses: number[];
}
