import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'double'})
    average
}
