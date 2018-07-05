import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { By } from '@angular/platform-browser';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    component.taskList = {
      id: 'af337ee',
      name: 'Test task name',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show tasks from the task list on the component', () => {
    const checkboxTask = fixture.debugElement.queryAll(
      By.css('ion-item > ion-checkbox')
    );

    expect(component.taskList).toContain(checkboxTask);
  });

  it('Should emit an event if the task is checked', () => {
    const toggleEmitter = spyOn(component.toggle, 'emit');

    const checkboxTask = fixture.debugElement.query(
      By.css('ion-item > ion-checkbox')
    );

    checkboxTask.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.toggle.emit).toHaveBeenCalledWith(true);
  });
});
