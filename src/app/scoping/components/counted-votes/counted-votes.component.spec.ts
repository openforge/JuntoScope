import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountedVotesComponent } from './counted-votes.component';

describe('CountedVotesComponent', () => {
  let component: CountedVotesComponent;
  let fixture: ComponentFixture<CountedVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountedVotesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountedVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
