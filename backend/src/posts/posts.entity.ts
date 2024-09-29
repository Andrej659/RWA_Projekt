import { User } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('posts') 
export class BlogPost {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  title: string;

  @Column()
  autorId: number;

  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })  // Post pripada jednom korisniku
  autor: User;

  @CreateDateColumn({ type: 'timestamp' })
  vrijeme_stvaranja: Date;

  @Column({ type: 'int', default: 0 })
  lajkovi: number;

  @Column({ length: 255 })
  content: string;
}
