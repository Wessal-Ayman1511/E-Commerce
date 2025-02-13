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

  registerFormGroup: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    {
      validators: this.confirmPassword,
    }
  );
  // registerFormGroup = new FormGroup(
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

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else return { mismatch: true };
  }

  //unSubscribe observable
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
                this._Router.navigate(['/login']);
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
