import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-crud-app';
  environment = Environment.Dev;

  message = signal<string>('');

  onKeyUp(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }
}

enum Environment {
  Dev = 'dev',
  Prod = 'prod',
}
