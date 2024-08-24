import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/Auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})




export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.pattern('')]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const body = this.loginForm.value;

      this.loginService.login(body).subscribe({
        next: (response) => {
          console.log(response);
          
          if (response.token) {
            console.log('Login successful:', response.data);
            localStorage.setItem('token@12E$n7', response.token);
            this.loginService.setLoggedInState(true);
              this.router.navigate(['/categories']);        
          } 
        },
        error: (error) => {
          this.errorMessage = 'An error occurred. Please try again.';
          console.error('Login error:', error);
        }
      });
    }
  }


  get f() {
    return this.loginForm.controls;
  }
}
