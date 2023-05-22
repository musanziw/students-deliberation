import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    level: number
}
