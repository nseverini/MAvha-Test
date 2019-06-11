import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListaComponent } from './todo-lista/todo-lista.component';
import { TodoComponent } from './todo/todo.component';
import { TodoCrearComponent } from './todo-crear/todo-crear.component';
import { TodoFiltroComponent } from './todo-filtro/todo-filtro.component';

@NgModule({
  declarations: [TodoListaComponent, TodoComponent, TodoCrearComponent, TodoFiltroComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
