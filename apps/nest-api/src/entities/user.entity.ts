import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { possibleUserStatus } from '../config/constats';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ type: 'date', nullable: false })
  registrationDate: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', default: 'created', enum: possibleUserStatus })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  activationLink: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
