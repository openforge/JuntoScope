import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemComponent } from './project-item.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { By } from '@angular/platform-browser';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Problem : [object ErrorEvent] thrown
    expect(component).toBeTruthy();
  });

  it('Should display a project name on the template', () => {
    component.project = {
      id: '382ff31',
      name: 'test project',
      taskLists: {},
    };

    const ionTitle = fixture.debugElement.query(By.css('ion-card-title'));

    fixture.detectChanges();

    expect(ionTitle).toContain(component.project);
  });
});
