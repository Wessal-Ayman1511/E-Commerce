import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  msgError: string = '';
  isLoading: boolean = false;
  msgSuccess: boolean = false;

  loginFormGroup: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });
  // loginFormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     rePassword: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmPassword
  // );

  loginSubmit(): void {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;
      this._AuthService.setloginForm(this.loginFormGroup.value).subscribe({
        next: (res) => {
          //res => show success message html user
          console.log(res);
          //1- save token
          localStorage.setItem('userToken', res.token);
          //2- delete token => auth service.ts
          this._AuthService.saveUserData();
          //3- redirect to home
          if (res.message == 'success') {
            this.msgSuccess = true;
            setTimeout(() => {
              this._Router.navigate(['/home']);
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          //err => show error message  html user
          this.msgError = err.error.message;
          console.log(err);
          this.isLoading = false;
        },
      });
    } else {
      this.loginFormGroup.setErrors({ mismatch: true });
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
