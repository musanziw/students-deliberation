import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { User } from '../../users/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.courses)
  user: User;

  @OneToMany(() => Grade, (grade) => grade.course, {
    cascade: true,
  })
  grades: Grade[];
}
