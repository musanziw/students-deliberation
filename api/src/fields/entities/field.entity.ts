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

  @Column()
  name: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.fields, {
    onDelete: 'CASCADE',
  })
  faculty: Faculty;

  @OneToMany(() => Promotion, (promotion) => promotion.field, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  promotions: Promotion[];
}
