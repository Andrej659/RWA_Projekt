import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {
    // Initialize the registration form with validation
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  // Method to submit the registration form
  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      
      if (password === confirmPassword) {
        this.userService.register(username, password).subscribe(
          (res) => {
            if (res) {
              this.router.navigate(['/login']);
            } else {
              this.errorMessage = 'User already exists!';
            }
        });
      } else {
        this.errorMessage = 'Passwords do not match!';
      }
    }
  }

  // Helper to check if the form is invalid
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    if(control == null){
      return true;
    }
    return control!.invalid && control!.touched;
  }
}
