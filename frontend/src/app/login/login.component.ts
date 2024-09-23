import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../auth/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,  // Declare this component as standalone
    imports: [CommonModule, FormsModule, RouterModule],  // Import necessary modules (CommonModule and FormsModule)
  })
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private app: AppComponent, private userService: UserService) {}

  login() {
    this.userService.login(this.username, this.password).subscribe(
      (res) => {
        if (res) {
          this.userService.setLoggedInUser(this.username);
          this.router.navigate(['/posts', this.username]);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      }
    );
  }
}
