import { IsDate, IsInt, MinDate } from 'class-validator';

export class CreatePeriodDto {
  @IsInt({ message: 'Le semestre est requis.' })
  semester: number;

  @IsDate({ message: 'La date de début est requise.' })
  @MinDate(new Date(), {
    message: 'La date de début doit être supérieure à la date actuelle.',
  })
  started_at;

  @IsDate({ message: 'La date de fin est requise.' })
  @MinDate(() => new Date(), {
    message: 'La date de fin doit être supérieure à la date actuelle.',
  })
  ended_at;
}
