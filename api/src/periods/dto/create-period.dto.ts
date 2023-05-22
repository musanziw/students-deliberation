import {IsDate, IsNumber} from "class-validator";

export class CreatePeriodDto {
    @IsNumber()
    semester: number

    @IsDate()
    started_at

    @IsDate()
    ended_at
}
