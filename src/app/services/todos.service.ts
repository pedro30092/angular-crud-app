import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
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

  getTodos() {
    return this.todos;
  }

  addTodos(todos: string) {
    this.todos.push({ title: todos });
  }
}
