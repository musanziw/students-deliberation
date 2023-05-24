import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @OneToMany(() => Report, (report) => report.session, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reports: Report[];
}
