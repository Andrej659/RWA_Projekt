import { Injectable } from '@nestjs/common';
import { log } from 'console';

export interface User {
    password: string;
    username: string;
}

@Injectable()
export class UsersService {
  private usersKey = 'users';
  private users: User[] = [
        {
            username: "abc",
            password: "123123",
        },
        {
            username: "test",
            password: "121212",
        }
    ];
  private loggedInUser: User = null;

  constructor() {}

  // Register a new user
  register(username: string, password: string): boolean {
    if (this.users.find(user => user.username === username)) {
      return false; // User already exists
    }
    
    const newUser: User = {
        password, // Store plain password for simplicity here
        username,
      };
    this.loggedInUser = newUser;
    this.users.push(newUser);
    return true;
  }

  // Log in the user
  login(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
        this.loggedInUser = user;
        return true;
    }
    return false;
  }

  getLoggedInUsername() {
    return this.loggedInUser.username;
  }

  // Log out the user
  logout(): void {
    this.loggedInUser = null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Get all users from local storage
  getUsers(): User[] {
    return this.users;
  }
}
