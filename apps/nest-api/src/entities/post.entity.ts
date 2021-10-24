import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 5000, nullable: false })
  desc: string;

  @CreateDateColumn({ type: 'date', nullable: false })
  createDate: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
