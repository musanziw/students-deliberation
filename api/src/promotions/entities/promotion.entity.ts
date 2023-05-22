import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Promotion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    level: number

    @Column()
    name: string
}
