import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field} from "../../fields/entities/field.entity";
import {Course} from "../../courses/entities/course.entity";

@Entity()
export class Promotion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    level: number

    @Column()
    name: string

    @ManyToOne(() => Field, (field) => field.promotions)
    field: Field

    @OneToMany(() => Course, (course) => course.promotion, {onDelete: "CASCADE", cascade: true})
    courses: Course[]
}
