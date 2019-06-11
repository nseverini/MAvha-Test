import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoQuery } from '../state/todo.query';
import { TodoService } from '../state/todo.service';
import { Todo } from '../state/todo.model';

@Component({
  selector: 'app-todo-lista',
  templateUrl: './todo-lista.component.html',
  styleUrls: ['./todo-lista.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListaComponent implements OnInit {
  todos$: Observable<Todo[]> = this.todoQuery.selectAll();
  todosCargando$: Observable<boolean> = this.todoQuery.selectLoading();

  constructor(private todoQuery: TodoQuery, private todoService: TodoService) { }

  ngOnInit() { }

  trackById(index, todo: Todo) {
    return todo.id;
  }

  crearTodo(nuevoTodo: Todo) {
    this.todoService.crearTodo(nuevoTodo);
  }

  editarTodo(todo: Todo) {
    this.todoService.editarTodo(todo);
  }

  filtrarTodos(todo: Todo) {
    this.todoService.filtrarTodos(
      todo.id, todo.descripcion, todo.estaResuelta
    );
  }

}
