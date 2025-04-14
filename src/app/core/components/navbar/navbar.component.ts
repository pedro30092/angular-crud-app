import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
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
}
