import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'friends' })
export class FriendEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'date', nullable: false, default: new Date().toISOString() })
  creationDate: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  friendId: string;

}
