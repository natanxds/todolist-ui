// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskResponseDTO {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskRequestDTO {

  id?: number;

  title: string;

  description: string;

  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/v1/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskResponseDTO[]> {
    return this.http.get<TaskResponseDTO[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<TaskResponseDTO> {
    return this.http.get<TaskResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskRequestDTO): Observable<TaskResponseDTO> {
    return this.http.post<TaskResponseDTO>(this.apiUrl, task);
  }

  updateTask(id: number, task: TaskRequestDTO): Observable<TaskResponseDTO> {
    return this.http.put<TaskResponseDTO>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
