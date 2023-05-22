import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    personal_number: string

    @Column()
    as_course: boolean
}
