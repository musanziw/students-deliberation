import { IsNumber } from 'class-validator';

export class CreateGradeDto {
  @IsNumber({}, { message: 'La note annuelle est requise.' })
  average;
}
