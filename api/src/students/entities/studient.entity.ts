import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Promotion} from "../../promotions/entities/promotion.entity";
import {Course} from "../../courses/entities/course.entity";
import {Report} from "../../reports/entities/report.entity";

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
    as_complementary_course: boolean

    @ManyToOne(() => Promotion, (promotion) => promotion.students)
    promotion: Promotion

    @ManyToMany(() => Course)
    @JoinTable()
    courses: Course[]

    @OneToMany(() => Report, (report) => report.student)
    reports: Report[]
}
