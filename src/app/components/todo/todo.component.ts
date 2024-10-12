// src/app/components/todo/todo.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService, TaskResponseDTO, TaskRequestDTO } from '../../services/todo.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [NgFor,NgIf, FormsModule],
})
export class TodoComponent implements OnInit {
  tasks: TaskResponseDTO[] = [];
  newTask: TaskRequestDTO = { title: '', description: '', isCompleted: false };
  editingTask: TaskRequestDTO = { title: '', description: '', isCompleted: false };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoService.getTasks().subscribe((data) => (this.tasks = data));
  }

  createTask(): void {
    if (!this.newTask.title.trim()) {
      alert('Title is required');
      return;
    }
    this.todoService.createTask(this.newTask).subscribe((task) => {
      this.tasks.push(task);
      this.newTask = { title: '', description: '', isCompleted: false };
    });
  }

  deleteTask(id: number): void {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  editTask(task: TaskResponseDTO): void {
    this.editingTask = { ...task };
  }

  updateTask(): void {
    if (!this.editingTask || this.editingTask.id === undefined) return;

    this.todoService.updateTask(this.editingTask.id, this.editingTask).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) this.tasks[index] = updatedTask;
      this.editingTask = { title: '', description: '', isCompleted: false };
    });
  }
}
