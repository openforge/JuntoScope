import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddConnectionComponent } from "./add-connection.component";

describe("AddConnectionComponent", () => {
  let component: AddConnectionComponent;
  let fixture: ComponentFixture<AddConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddConnectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
