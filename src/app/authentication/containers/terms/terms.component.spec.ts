import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterFacade } from '../../../state/router.facade';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { StoreMock } from './../../../mocks/ngrx/store.mock';
import { initialState, reducers } from '../../../state/app.reducer';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TermsComponent } from './terms.component';

describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {
          initialState: { router: initialState.router },
        }),
        RouterTestingModule,
      ],
      providers: [
        Actions,
        RouterFacade,
        {
          provide: Store,
          useValue: new StoreMock(initialState),
        },
      ],
      declarations: [TermsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
