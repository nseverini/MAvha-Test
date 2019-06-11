import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from '../state/todo.model';

@Component({
  selector: 'app-todo-filtro',
  templateUrl: './todo-filtro.component.html',
  styleUrls: ['./todo-filtro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFiltroComponent implements OnInit {
  @Output() filtrarTodos = new EventEmitter<Todo>();
  filtrarTodosForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.filtrarTodosForm = new FormGroup({
      'id': new FormControl(''),
      'descripcion': new FormControl(''),
      'estaResuelta': new FormControl(null),
    });
  }

}
