import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
    tosatMessge: string = "";


  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const body = this.resetPasswordForm.value;
      const { username, newPassword } = body;

      this.loginService.resetToken(username).subscribe({
        next: (response) => {
          console.log('ujgufyud',response);
          body.token = response.token;
          console.log(body);

          this.loginService.resetPasswprd(body).subscribe({
            next: (res) => {
              console.log('resutPass', res);
              if (res.status === 200) {
                
              this.router.navigate(['/categories']);
                this.showToast('تم  تغير كلمة المرور بنجاح');
              }
                
            },
            error: (error) => {
              console.log('resutPass',error);
            }
          });
        },
        error: (error) => {
          this.errorMessage = 'حدث خطأ أثناء إرسال طلب إعادة التعيين.';
          console.error('Error:', error);
        }
      });
    }
  }


    showToast(toastMessage: string): void {
    const toastElement = document.getElementById("creatToast");
    this.tosatMessge = toastMessage;
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }

}
