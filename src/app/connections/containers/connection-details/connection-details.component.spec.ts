import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';
import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { AppFacade } from '../../../state/app.facade';
import { ConnectionFacade } from './../../state/connection.facade';
import { RouterFacade } from './../../../state/router.facade';
import { initialState, reducers } from '../../../state/app.reducer';
import { ConnectionService } from '../../../connections/services/connection.service';
import { PopupService } from '../../../shared/popup.service';

import { StoreMock } from './../../../mocks/ngrx/store.mock';
import { PopupServiceMock } from './../../../mocks/ionic/popup-service.mock';
import { RouterFacadeMock } from './../../../mocks/facades/router-facade.mock';
import { AngularFirestoreMock } from './../../../mocks/angularfire/firestore.mock';

import { ConnectionDetailsComponent } from './connection-details.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConnectionDetailsComponent', () => {
  let component: ConnectionDetailsComponent;
  let fixture: ComponentFixture<ConnectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, {
          initialState: { router: initialState.router },
        }),
      ],
      declarations: [ConnectionDetailsComponent],
      providers: [
        Actions,
        AppFacade,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
