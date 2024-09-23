import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UserService } from './auth/user.service';
import { CommonModule } from '@angular/common';  // Import common directives (e.g., *ngIf, *ngFor)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Declare this as a standalone component
  imports: [RouterModule, CommonModule],  // Import RouterModule for routing & CommonModule for directives
})
export class AppComponent {
  user: String | null = "";

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe(val => {
      this.user = userService.getLoggedInUser();
    });
  }

  get isAuthenticated(): boolean {
    return this.userService.getLoggedInUser() != null;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
