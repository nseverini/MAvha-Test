import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Todo } from '../state/todo.model';

@Component({
  selector: 'app-todo-crear',
  templateUrl: './todo-crear.component.html',
  styleUrls: ['./todo-crear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCrearComponent implements OnInit {
  @Output() crearTodo = new EventEmitter<Todo>();
  crearTodoForm: FormGroup;
  todoArchivo: File;

  constructor() { }

  ngOnInit() {
    this.crearTodoForm = new FormGroup({
      'descripcion': new FormControl(null, [Validators.required]),
      'archivo': new FormControl(null, [Validators.required]),
    });
  }

  crearNuevoTodo() {
    if (this.crearTodoForm.valid) {
      this.crearTodo.emit({ id: 0, estaResuelta: false, descripcion: this.crearTodoForm.controls['descripcion'].value, archivo: this.todoArchivo });
      this.crearTodoForm.reset();
    }
  }

  seleccionarArchivo(e) {
    this.todoArchivo = e.target.files[0];
  }

}
