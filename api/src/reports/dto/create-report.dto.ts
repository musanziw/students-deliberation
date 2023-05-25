import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString({ message: 'La mention est requise.' })
  mention;
}
