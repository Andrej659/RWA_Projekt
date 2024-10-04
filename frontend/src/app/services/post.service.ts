import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


export class BlogPost {
  postId: number;
  title: string;
  autorId : number;
  lajkovi : number;
  content: string;
  vrijeme_stvaranja: Date;
  
  constructor(postId: number, title: string, autorId : number, lajkovi : number, content: string, vrijeme_stvaranja: Date) {
    this.postId = postId;
    this.title = title;
    this.autorId = autorId;
    this.lajkovi = lajkovi;
    this.content = content;
    this.vrijeme_stvaranja = vrijeme_stvaranja;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  createPost(username : string, title: string, content: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = { username, title, content };
    return this.http.post(`${this.apiUrl}/${username}/create`, payload);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserPosts(username : string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`);
  }

  getSingleUserPost(postId: number, username: string): Observable<any> {
    console.log(postId);
    return this.http.get(`${this.apiUrl}/${username}/${postId}`)
  }

  getPost(postId: number): Observable<any> {
    console.log(postId);
    return this.http.get(`${this.apiUrl}/posts/${postId}`)
  }


  updatePost(postId: number, title: string, content: string, username: string): Observable<any> {
    const payload = { title, content };
    return this.http.put(`${this.apiUrl}/${username}/${postId}/edit`, payload);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${postId}`);
  }

  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      let username: string = decodedToken.username;
      return username;
    }
    return null;
  }

  likePost(postId: number) {
    return this.http.get; // Pretpostavljamo da je ovo ispravan URL za lajk
  }
}
