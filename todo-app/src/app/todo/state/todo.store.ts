import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface TodoState extends EntityState<Todo> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todos', idKey: 'id', resettable: true })
export class TodoStore extends EntityStore<TodoState, Todo> {
    constructor() {
        super();
    }
}