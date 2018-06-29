import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrivacyPage } from "./privacy";

describe("PrivacyComponent", () => {
  let component: PrivacyPage;
  let fixture: ComponentFixture<PrivacyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPage]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
