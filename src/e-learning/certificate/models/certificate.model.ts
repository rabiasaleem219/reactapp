import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  courseId: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  key: string;

  @CreateDateColumn()
  createdAt: Date;
}
