import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field } from '../../fields/entities/field.entity';
import { Course } from '../../courses/entities/course.entity';
import { Student } from '../../students/entities/studient.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  name: string;

  @ManyToOne(() => Field, (field) => field.promotions, {
    cascade: true,
  })
  field: Field;

  @OneToMany(() => Course, (course) => course.promotion, {
    cascade: true,
  })
  courses: Course[];

  @OneToMany(() => Student, (student) => student.promotion, {
    cascade: true,
  })
  students: Student[];
}
