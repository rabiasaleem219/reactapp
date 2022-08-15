import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  key: string;

  @Column()
  size: number;

  @Column()
  lesson: string;

  @Column({ nullable: true })
  section: string;
}
