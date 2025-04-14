import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated = false;

  firebaseAuthService = inject(Auth);

  register(email: string, password: string): Observable<void> {
    const registerPromise = createUserWithEmailAndPassword(
      this.firebaseAuthService,
      email,
      password
    ).then(() => {});

    return from(registerPromise);
  }

  login(email: string, password: string): Observable<void> {
    const registerPromise = createUserWithEmailAndPassword(
      this.firebaseAuthService,
      email,
      password
    ).then(() => {});

    return from(registerPromise);
  }
}
