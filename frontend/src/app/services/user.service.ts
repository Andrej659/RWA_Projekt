import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  password: string;
  username: string;
} 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  logout(): void {
    localStorage.removeItem('username');
    this.http.get(`${this.apiUrl}/logout`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  setLoggedInUser(username: string) {
    localStorage.setItem('username', username);
  }

  getLoggedInUser() {
    return localStorage.getItem('username');
}
}
