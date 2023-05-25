import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'Le prénom est requis.' })
  firstname;

  @IsString({ message: 'Le nom est requis.' })
  lastname;

  @IsString({ message: 'Le nom est requis.' })
  name;

  @IsString({ message: "L'email est requis." })
  email;

  @IsString({ message: 'Le numéro matricule est requis.' })
  personal_number;

  @IsBoolean()
  @IsOptional()
  as_complementary_course;
}
