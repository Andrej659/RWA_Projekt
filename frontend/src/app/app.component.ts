import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username : string = '';

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute, public authService: AuthService) {
    router.events.subscribe(val => {
      this.username = userService.getUsernameFromToken() || '';
    });
  }


  logout() {
    console.log('Logging out...');
    localStorage.removeItem('access_token');
    console.log('Access token removed:', !localStorage.getItem('access_token'));
    this.router.navigate(['/login']);
  }
}
