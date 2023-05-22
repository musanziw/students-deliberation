import {IsNumber} from "class-validator";

export class CreateSessionDto {
    @IsNumber()
    level
}
