import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionScopingComponent } from './session-scoping.component';

describe('SessionScopingComponent', () => {
  let component: SessionScopingComponent;
  let fixture: ComponentFixture<SessionScopingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionScopingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionScopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
