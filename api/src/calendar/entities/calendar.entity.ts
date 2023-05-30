import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Period {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  semester: number;

  @Column({ type: 'datetime' })
  started_at;

  @Column({ type: 'datetime' })
  ended_at;

  courses: Course[];
}
