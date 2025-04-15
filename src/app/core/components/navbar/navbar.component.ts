import { Component, inject } from '@angular/core';
import { User as FirebaseAuthUser } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { User } from '../../../features/user/models/user.model';
import { UserService } from '../../../features/user/services/user.service';
import { LoggingInComponent } from './logging-in/logging-in.component';
import { LoggingOutComponent } from './logging-out/logging-out.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LoggingOutComponent, LoggingInComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userService = inject(UserService);

  constructor() {
    this.userService.user$.subscribe({
      next: (user: FirebaseAuthUser | null) => {
        if (user) {
          const applicationUser: User = {
            email: user.email!,
            id: user.uid,
          };
          this.userService.currentUser.set(applicationUser);
        }
      },
    });
  }
}
