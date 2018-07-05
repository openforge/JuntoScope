import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Need to create and import PopupService Mock here

import { VerifyModalComponent } from './verify-modal.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('VerifyModalComponent', () => {
  let component: VerifyModalComponent;
  let fixture: ComponentFixture<VerifyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
