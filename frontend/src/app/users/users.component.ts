import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../auth/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: String[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = (response as User[]).map(user => user.username);
      }
    );
  }

}
