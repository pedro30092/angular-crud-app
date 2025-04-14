import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';

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

  login(email: string, password: string): Observable<User> {
    const loginPromise = signInWithEmailAndPassword(
      this.firebaseAuthService,
      email,
      password
    ).then((userCredentials) => {
      return {
        email: userCredentials.user.email ?? '',
        id: userCredentials.user.uid,
      } as User;
    });

    return from(loginPromise);
  }
}
