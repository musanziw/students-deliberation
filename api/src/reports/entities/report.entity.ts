import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../students/entities/studient.entity';
import { Session } from '../../sessions/entities/session.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  mention: string;

  @ManyToOne(() => Student, (student) => student.reports)
  student: Student;

  @ManyToOne(() => Session, (session) => session.reports)
  session: Session;
}
