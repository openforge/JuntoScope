import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SessionHistoryItemComponent } from "./session-history-item.component";

describe("SessionHistoryItemComponent", () => {
  let component: SessionHistoryItemComponent;
  let fixture: ComponentFixture<SessionHistoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionHistoryItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
