import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyComponent } from './privacy.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { reducers, initialState } from '../../../../app/state/app.reducer';
import { RouterFacade } from '../../../state/router.facade';

import { RouterTestingModule } from '@angular/router/testing';

import { StoreMock } from './../../../mocks/ngrx/store.mock';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, {
          initialState: { router: initialState.router },
        }),
      ],
      providers: [
        Actions,
        RouterFacade,
        {
          provide: Store,
          useValue: new StoreMock(initialState),
        },
      ],
      declarations: [PrivacyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
