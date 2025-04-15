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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userService = inject(UserService);
  router = inject(Router);

  errorMessage = signal<string | undefined>(undefined);

  registerForm = new FormGroup({
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
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  onFormSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formRawValues = this.registerForm.getRawValue();

    this.userService
      .register(formRawValues.email, formRawValues.password)
      .subscribe({
        next: () => {
          this.errorMessage.set(undefined);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          this.errorMessage.set(error.message);
        },
      });
  }
}
