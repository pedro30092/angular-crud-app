import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  //Use inject for a service name token
  todoService = inject(TodosService);

  todos = this.todoService.getTodos();

  addTodo(todo: string) {
    this.todoService.addTodos(todo);
    this.todos = this.todoService.getTodos();
  }
}
