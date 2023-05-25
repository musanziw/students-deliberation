import { IsString } from 'class-validator';

export class CreateFacultyDto {
  @IsString({ message: 'Le nom est requis.' })
  name: string;
}
