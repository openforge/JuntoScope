import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAccessComponent } from './session-access.component';

describe('SessionAccessComponent', () => {
  let component: SessionAccessComponent;
  let fixture: ComponentFixture<SessionAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionAccessComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
