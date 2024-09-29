import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogPost } from './posts.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(BlogPost)
    private postsRepository: Repository<BlogPost>,
  ) {}

async createPost(autorId: number, title: string, content: string): Promise<BlogPost> {
  const newPost = this.postsRepository.create({ autorId, title, content });
  return this.postsRepository.save(newPost);
}

async deletePost(postId: number): Promise<void> {
  await this.postsRepository.delete(postId);
}

// Metoda za editovanje (izmenu) posta
async updatePost(postId: number, content: string): Promise<BlogPost> {
  const post = await this.postsRepository.findOne({ where: { postId } });
  if (post) {
    post.content = content;
    return this.postsRepository.save(post);  // Čuvanje ažuriranog posta
  }
  throw new Error('Post not found');
}

async findAllPosts(): Promise<BlogPost[]> {
  return this.postsRepository.find();  // Vraćamo sve postove
}

async findPostsByUser(autorId: number): Promise<BlogPost[]> {
  return this.postsRepository.find({ where: { autorId } });
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
}
