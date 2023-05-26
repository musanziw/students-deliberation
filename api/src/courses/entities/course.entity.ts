import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { User } from '../../users/entities/user.entity';
import { Period } from '../../periods/entities/period.entity';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hours: number;

  @Column()
  credit: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.courses)
  promotion: Promotion;

  @ManyToOne(() => User, (user) => user.courses, {
    cascade: true,
  })
  user: User;

  @ManyToOne(() => Period, (period) => period.courses, {
    cascade: true,
  })
  period: Period;

  @OneToMany(() => Grade, (grade) => grade.course, {
    cascade: true,
  })
  grades: Grade[];
}
