import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';
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

  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe(val => {
      this.user = authService.getUsername();
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
