import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListaComponent } from './todo-lista/todo-lista.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
