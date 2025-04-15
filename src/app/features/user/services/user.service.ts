import { inject, Injectable, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<User | undefined>(undefined);
  firebaseAuthService = inject(Auth);
  user$ = user(this.firebaseAuthService);

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

  logout(): Observable<void> {
    const logoutPromise = signOut(this.firebaseAuthService);

    return from(logoutPromise);
  }
}
