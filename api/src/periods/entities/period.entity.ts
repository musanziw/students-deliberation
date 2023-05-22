import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Period {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    semester: number

    @Column()
    start: Date

    @Column()
    end: Date
}
