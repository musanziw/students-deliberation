import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Grade, (grade) => grade.session, {
    cascade: true,
  })
  grades: Grade[];
}
