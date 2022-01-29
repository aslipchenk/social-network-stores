import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'friendship' })
export class FriendshipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'date', nullable: false, default: new Date().toISOString() })
  creationDate: string;

  @Column({ nullable: false, type: 'uuid', width: 255 })
  requestUser: string;

  @Column({ nullable: false, type: 'uuid', width: 255 })
  approveUser: string;
}
