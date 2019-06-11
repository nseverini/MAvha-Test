import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCrearComponent } from './todo-crear.component';

describe('TodoCrearComponent', () => {
  let component: TodoCrearComponent;
  let fixture: ComponentFixture<TodoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
