import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoggingOutComponent } from './logging-out/logging-out.component';
import { LoggingInComponent } from './logging-in/logging-in.component';

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
