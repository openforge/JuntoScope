import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultEstimateComponent } from "./result-estimate.component";

describe("ResultEstimateComponent", () => {
  let component: ResultEstimateComponent;
  let fixture: ComponentFixture<ResultEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultEstimateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
