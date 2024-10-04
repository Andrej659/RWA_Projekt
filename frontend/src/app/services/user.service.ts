import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface User {
  password: string;
  username: string;
} 

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  register(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.http.get(`${this.apiUrl}/logout`);
  }

  getAuthorUsername(autorID : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/autorName/${autorID}`)
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
}
