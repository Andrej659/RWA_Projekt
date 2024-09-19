import { Injectable } from '@angular/core';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsKey = 'posts';

  constructor() {}

  getPosts(): Post[] {
    const posts = localStorage.getItem(this.postsKey);
    return posts ? JSON.parse(posts) : [];
  }

  getUserPosts(username: String): Post[] {
    const posts = this.getPosts();
    return posts.filter(post => post.author == username);
  }

  getPost(id: number): Post | undefined {
    const posts = this.getPosts();
    return posts.find(post => post.id === id);
  }

  addPost(post: Post): void {
    const posts = this.getPosts();
    post.id = new Date().getTime(); // Unique ID based on timestamp
    posts.push(post);
    localStorage.setItem(this.postsKey, JSON.stringify(posts));
  }

  editPost(updatedPost: Post): void {
    let posts = this.getPosts();
    posts = posts.map(post => (post.id === updatedPost.id ? updatedPost : post));
    localStorage.setItem(this.postsKey, JSON.stringify(posts));
  }

  deletePost(id: number): void {
    let posts = this.getPosts();
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem(this.postsKey, JSON.stringify(posts));
  }
}
