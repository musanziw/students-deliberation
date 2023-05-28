import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Faculty } from '../../faculties/entities/faculty.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Faculty, (faculty) => faculty.fields)
  faculty: Faculty;

  @OneToMany(() => Promotion, (promotion) => promotion.field, {
    cascade: true,
  })
  promotions: Promotion[];
}
