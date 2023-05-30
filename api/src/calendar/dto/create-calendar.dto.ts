import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCalendarDto {
  @IsInt({ message: 'Le semestre est requis.' })
  semester: number;

  @IsNotEmpty({ message: 'La date de début est requise.' })
  started_at;

  @IsNotEmpty({ message: 'La date de fin est requise.' })
  ended_at;
}
