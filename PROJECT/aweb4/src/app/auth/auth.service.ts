import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'users';

  constructor() {}

  // Register a new user
  register(username: string, password: string): boolean {
    const users = this.getUsers();
    if (users.find(user => user.username === username)) {
      return false; // User already exists
    }
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('username', username);
    
    users.push({ username, password });
    this.saveUsers(users);
    return true;
  }

  // Log in the user
  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Get all users from local storage
  getUsers(): { username: string; password: string }[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  // Save the users array to local storage
  private saveUsers(users: { username: string; password: string }[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
