import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'token' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: string;
}
