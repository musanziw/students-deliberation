import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Student } from '../../students/entities/studient.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  average;

  @Column()
  session: number;

  @ManyToOne(() => Course, (course) => course.grades)
  course: Course;

  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;
}
