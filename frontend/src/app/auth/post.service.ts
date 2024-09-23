import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  createPost(title: string, content: string, author: string): Observable<any> {
    const payload = { title, content, author };
    return this.http.post(`${this.apiUrl}/${author}/create`, payload);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserPosts(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`);
  }

  getPost(postId: number, username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}/${postId}`)
  }

  updatePost(postId: number, title: string, content: string, author: string): Observable<any> {
    const payload = { title, content };
    return this.http.patch(`${this.apiUrl}/${author}/${postId}/edit`, payload);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${postId}`);
  }
}
