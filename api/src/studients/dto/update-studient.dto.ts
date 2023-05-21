import { PartialType } from '@nestjs/mapped-types';
import { CreateStudientDto } from './create-studient.dto';

export class UpdateStudientDto extends PartialType(CreateStudientDto) {}
