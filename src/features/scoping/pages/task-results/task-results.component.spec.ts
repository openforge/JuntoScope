import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TaskResultsComponent } from "./task-results.component";

describe("TaskResultsComponent", () => {
  let component: TaskResultsComponent;
  let fixture: ComponentFixture<TaskResultsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TaskResultsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
