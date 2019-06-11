import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFiltroComponent } from './todo-filtro.component';

describe('TodoFiltroComponent', () => {
  let component: TodoFiltroComponent;
  let fixture: ComponentFixture<TodoFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
