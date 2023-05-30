import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Course } from '../../courses/entities/course.entity';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  personal_number: string;

  @Column({ default: false })
  as_complementary_course: boolean;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Promotion, (promotion) => promotion.students)
  promotion: Promotion;

  @ManyToMany(() => Course)
  @JoinTable({
    name: 'additional_courses',
  })
  courses: Course[];

  @OneToMany(() => Grade, (grade) => grade.student, {
    cascade: true,
  })
  grades: Grade[];
}
