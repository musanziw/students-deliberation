import { IsInt, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsInt({ message: 'Le niveau est requis.' })
  level: number;

  @IsString({ message: 'Le nom est requis.' })
  name: string;
}
