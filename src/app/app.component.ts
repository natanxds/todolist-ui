// src/app/app.component.ts
import { Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-root',
  template: '<app-todo></app-todo>',
  standalone: true,
  imports: [TodoComponent],
})
export class AppComponent {}
