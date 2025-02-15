import { Component, inject, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  msgError: string = '';
  isLoading: boolean = false;
  msgSuccess: boolean = false;

  registerFormGroup: FormGroup = this._FormBuilder.group({
    username: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  registerSub!: Subscription;

  registerSubmit(): void {
    if (this.registerFormGroup.valid) {
      this.isLoading = true;
      this._AuthService
        .setRegisterForm(this.registerFormGroup.value)
        .subscribe({
          next: (res) => {
            //res => show success message html user
            console.log(res);

            if (res.message == 'success') {
              this.msgSuccess = true;
              setTimeout(() => {
                this._Router.navigate(['/auth']);
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
      this.registerFormGroup.setErrors({ mismatch: true });
      this.registerFormGroup.markAllAsTouched();
    }
  }
  OnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
