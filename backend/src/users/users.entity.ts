import { BlogPost } from 'src/posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => BlogPost, post => post.autorId)  // Jedan korisnik ima više postova
  posts: BlogPost[];
}

