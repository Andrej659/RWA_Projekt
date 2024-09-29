import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class BlogPost {
  postId: number;
  title: string;
  autorId : number;
  lajkovi : number;
  content: string;
  
  constructor(postId: number, title: string, autorId : number, lajkovi : number, content: string) {
    this.postId = postId;
    this.title = title;
    this.autorId = autorId;
    this.lajkovi = lajkovi;
    this.content = content;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  createPost(username : string, title: string, content: string): Observable<any> {
    const payload = { username, title, content };
    return this.http.post(`${this.apiUrl}/${username}/create`, payload);
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

  updatePost(postId: number, title: string, content: string, username: string): Observable<any> {
    const payload = { title, content };
    return this.http.put(`${this.apiUrl}/${username}/${postId}/edit`, payload);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${postId}`);
  }
}
