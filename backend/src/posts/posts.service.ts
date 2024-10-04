import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogPost } from './posts.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(BlogPost)
    private postsRepository: Repository<BlogPost>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

async createPost(username: string, title: string, content: string): Promise<BlogPost> {
  const autor = await this.usersRepository.findOne({ where: { username } });
  const newPost = this.postsRepository.create({ autorId: autor.id, title, content });
  return this.postsRepository.save(newPost);
}

async deletePost(postId: number): Promise<void> {
  await this.postsRepository.delete(postId);
}

// Metoda za editovanje (izmenu) posta
async updatePost(postId: number, title : string, content: string): Promise<BlogPost> {
  const post = await this.postsRepository.findOne({ where: { postId } });
  if (post) {
    post.title = title;  
    post.content = content;
    return this.postsRepository.save(post);  // Čuvanje ažuriranog posta
  }
  throw new Error('Post not found');
}

async findAllPosts(): Promise<BlogPost[]> {
  return this.postsRepository.find();  // Vraćamo sve postove
}

async findIdByUsername(username: string): Promise<number> {
  const user = await this.usersRepository.findOne({ where: { username: username } });
  if (user) {
    return user.id; // Pretpostavljamo da korisnik ima polje id
  }
  throw new Error(`User with username ${username} not found`);
}


async findPostsByUserId(username: string): Promise<BlogPost[]> {
  const userId = await this.findIdByUsername(username);
  return this.postsRepository.find({ where: { autorId: userId } });
}

// (Ovo je dodatna metoda) - Metoda za dodavanje lajkova postu
async addLike(postId: number): Promise<BlogPost> {
  const post = await this.postsRepository.findOne({ where: { postId } });
  if (post) {
    post.lajkovi += 1;
    return this.postsRepository.save(post);  // Čuvanje ažuriranog posta
  }
  throw new Error('Post not found');
}

async getSinglePost(postId : number): Promise<any> {
  const post = await this.postsRepository.findOne({ where: { postId } });
  const usnm = await this.getAutorsName(post.autorId);
  return {username: usnm, post: post};
}

  async getAutorsName(autorId : number): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id: autorId } });
    if (user) {
      return user.username; 
    }
    throw new Error(`User with id ${autorId} not found`);
  }

async getPost(username: string, postId : number): Promise<BlogPost> {
  const autor = await this.usersRepository.findOne({ where: { username } });
  return this.postsRepository.findOne({ where: { autorId: autor.id, postId } });
}
}
