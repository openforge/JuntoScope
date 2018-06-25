import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareScopeLinkComponent } from './share-scope-link.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ShareScopeLinkComponent', () => {
  let component: ShareScopeLinkComponent;
  let fixture: ComponentFixture<ShareScopeLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareScopeLinkComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareScopeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
