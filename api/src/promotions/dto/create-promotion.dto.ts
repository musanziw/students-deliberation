import {IsInt, IsString} from "class-validator";

export class CreatePromotionDto {
    @IsInt()
    level: number

    @IsString()
    name: string
}
