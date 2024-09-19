import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';


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

  constructor(private authService: AuthService, private router: Router, private app: AppComponent) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/posts', this.username]);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
