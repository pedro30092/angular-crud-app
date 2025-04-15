import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import { User } from '../../../../features/user/models/user.model';

@Component({
  selector: 'app-logging-in',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logging-in.component.html',
  styleUrl: './logging-in.component.css',
})
export class LoggingInComponent {
  navbarService = inject(NavbarService);

  currentUser = input.required<User>();
}
