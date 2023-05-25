import { IsNumber } from 'class-validator';

export class CreateSessionDto {
  @IsNumber({}, { message: 'Le niveau est requis.' })
  level;
}
