import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '../../fields/entities/field.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Field, (field) => field.faculty, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  fields: Field[];
}
