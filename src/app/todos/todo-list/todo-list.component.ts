import { Component } from '@angular/core';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

interface TodoItem {
  title: string;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoListItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todos: TodoItem[] = [
    {
      title: 'Angular',
    },
    {
      title: 'React',
    },
    {
      title: 'Vue',
    },
    {
      title: 'Svelte',
    },
    {
      title: 'Solid',
    },
    {
      title: 'Astro',
    },
    {
      title: 'Lit',
    },
    {
      title: 'Backbone',
    },
    {
      title: 'Ember',
    },
    {
      title: 'Mithril',
    },
  ];
}
