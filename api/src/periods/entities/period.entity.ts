import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Period {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    semester: number

    @Column({type: 'datetime'})
    started_at

    @Column({type: 'datetime'})
    ended_at: Date
}
