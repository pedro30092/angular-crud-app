import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  imports: [],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css',
})
export class TodoListItemComponent {
  title = input.required<string>();
  isCompleted = signal<boolean>(false);

  toggleCompleted() {
    this.isCompleted.update((completed) => !completed);
  }

  isButtonDisabled(): boolean {
    return this.isCompleted();
  }
}
