import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private app: AppComponent, private userService: UserService, private authService: AuthService) {}

        login() {
          this.authService.login(this.username, this.password).subscribe(res=> {
            if (res && typeof res === 'object' && 'access_token' in res) {
              const token = res.access_token as string;
              localStorage.setItem('access_token', token);
              this.router.navigate([`/posts/${this.username}`]);
            } else {
              this.errorMessage = 'Invalid credentials!';
            }
          });
        }
}
