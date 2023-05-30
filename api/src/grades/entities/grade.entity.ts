import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Student } from '../../students/entities/studient.entity';
import { Session } from '../../sessions/entities/session.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  average;

  @Column()
  student_level: number;

  @ManyToOne(() => Session, (session) => session.grades)
  session: Session;

  @ManyToOne(() => Course, (course) => course.grades)
  course: Course;

  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;
}
