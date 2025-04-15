import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  template: '',
  standalone: true,
})
export class LogoutComponent {
  userService = inject(UserService);
  router = inject(Router);

  constructor() {
    this.userService.logout().subscribe({
      next: () => {
        this.userService.currentUser.set(undefined);
        this.router.navigate(['/login']);
      },
    });
  }
}
