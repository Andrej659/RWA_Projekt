import { Injectable } from '@nestjs/common';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor() {}

  getPosts(): Post[] {
    return this.posts;
  }

  getUserPosts(username: String): Post[] {
    return this.posts.filter(post => post.author == username);
  }

  getPost(id: number): Post | undefined {
    return this.posts.find(post => post.id == id);
  }

  addPost(title: string, content: string, username: string): void {
    const newPost: Post = {
        id: new Date().getTime(),
        title: title,
        content: content,
        author: username || 'Anonymous',
      };
    this.posts.push(newPost);
  }

  editPost(updatedPost: Post): void {
    this.posts = this.posts.map(post => (post.id == updatedPost.id ? updatedPost : post));
  }

  deletePost(id: number): void {
    this.posts = this.posts.filter(post => post.id != id);
  }
}
