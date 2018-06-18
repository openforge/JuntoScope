import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AngularFirestore } from 'angularfire2/firestore';

import { initialState, reducers } from './../../../state/app.reducer';
import { AppFacade } from '../../../state/app.facade';
import { ConnectionFacade } from './../../state/connection.facade';
import { ConnectionService } from '../../../connections/services/connection.service';
import { RouterFacade } from './../../../state/router.facade';
import { PopupService } from './../../../shared/popup.service';

import { StoreMock } from './../../../mocks/ngrx/store.mock';
import { RouterFacadeMock } from './../../../mocks/facades/router-facade.mock';
import { PopupServiceMock } from './../../../mocks/ionic/popup-service.mock';
import { AngularFirestoreMock } from './../../../mocks/angularfire/firestore.mock';

import { AddConnectionComponent } from './add-connection.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddConnectionComponent', () => {
  let component: AddConnectionComponent;
  let fixture: ComponentFixture<AddConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {
          initialState: { router: initialState.router },
        }),
      ],
      providers: [
        // Router,
        Actions,
        AppFacade,
        RouterFacade,
        ConnectionFacade,
        ConnectionService,
        {
          provide: Store,
          useValue: new StoreMock(initialState),
        },
        {
          provide: RouterFacade,
          useValue: RouterFacadeMock,
        },
        {
          provide: AngularFirestore,
          useValue: AngularFirestoreMock,
        },
        {
          provide: PopupService,
          useValue: PopupServiceMock,
        },
      ],
      declarations: [AddConnectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
