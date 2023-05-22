import {Column, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    firstname

    @IsString()
    lastname

    @IsString()
    name

    @IsEmail()
    email

    @IsString()
    password
}
