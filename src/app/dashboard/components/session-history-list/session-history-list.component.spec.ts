import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryListComponent } from './session-history-list.component';

describe('SessionHistoryListComponent', () => {
  let component: SessionHistoryListComponent;
  let fixture: ComponentFixture<SessionHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionHistoryListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
