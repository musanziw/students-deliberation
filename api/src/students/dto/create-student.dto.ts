import {IsBoolean, IsString} from "class-validator";

export class CreateStudentDto {
    @IsString()
    firstname

    @IsString()
    lastname

    @IsString()
    name

    @IsString()
    email

    @IsString()
    personal_number

    @IsBoolean()
    as_complementary_course
}
