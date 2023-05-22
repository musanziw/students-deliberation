import {IsString} from "class-validator";

export class CreateFieldDto {
    @IsString()
    name: string
}
