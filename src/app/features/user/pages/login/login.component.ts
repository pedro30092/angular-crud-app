import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);

  errorMessage = signal<string | undefined>(undefined);

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ],
    }),
  });

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formRawValues = this.loginForm.getRawValue();
    console.log(formRawValues);

    this.userService
      .login(formRawValues.email, formRawValues.password)
      .subscribe({
        next: () => {
          alert('User registered successfully');
          this.errorMessage.set(undefined);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error login user:', error);
          this.errorMessage.set(error.message);
        },
      });
  }
}
