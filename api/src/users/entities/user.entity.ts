import {Column, Entity, JoinTable, OneToMany, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "../../courses/entities/course.entity";
import {Role} from "../../roles/entities/role.entity";

@Entity()
export class User {
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
    password: string

    @OneToMany(() => Course, (course) => course.user)
    courses: Course[]

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]
}
