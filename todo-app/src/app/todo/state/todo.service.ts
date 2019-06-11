import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ID, guid } from '@datorama/akita';
import { TodoStore } from './todo.store';
import { Todo } from './todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient, private todoStore: TodoStore) {
        this.obtenerTodos();
    }

    obtenerTodos() {
        this.http.get<Todo[]>(environment.apiUrl + '/todo').subscribe(
            data => {
                this.todoStore.set(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    crearTodo(nuevoTodo: Todo) {
        let formData: FormData = new FormData();
        formData.append('nuevoTodo', JSON.stringify(nuevoTodo));
        formData.append('archivo', nuevoTodo.archivo, nuevoTodo.archivo.name);

        this.http.post<Todo>(environment.apiUrl + '/todo', formData).subscribe(
            data => {
                this.todoStore.add(data);
            },
            error => {
                console.log(error);
            }
        );
    }


    editarTodo(unTodo: Todo) {
        this.http.put<Todo>(environment.apiUrl + '/todo/' + unTodo.id, unTodo).subscribe(
            data => {
                this.todoStore.update(unTodo.id, unTodo);
            },
            error => {
                console.log(error);
            }
        );
    }

    filtrarTodos(id?: ID, descripcion?: string, estaResuelta?: boolean) {
        let params = new HttpParams();
        params = params.append('id', id != null ? id.toString() : null);
        params = params.append('descripcion', descripcion);
        params = params.append('estaResuelta', estaResuelta != null ? estaResuelta.toString() : null);

        this.http.get<Todo[]>(environment.apiUrl + '/todo/filtrarTodos', { params: params }).subscribe(
            data => {
                this.todoStore.set(data);
            },
            error => {
                console.log(error);
            }
        );
    }

}