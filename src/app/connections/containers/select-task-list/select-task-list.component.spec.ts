import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';
import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { initialState, reducers } from './../../../state/app.reducer';
import { ConnectionService } from '../../../connections/services/connection.service';
import { ConnectionFacade } from '../../../connections/state/connection.facade';
import { RouterFacade } from './../../../state/router.facade';
import { PopupService } from '../../../shared/popup.service';
import { AppFacade } from './../../../state/app.facade';

import { StoreMock } from './../../../mocks/ngrx/store.mock';
import { PopupServiceMock } from './../../../mocks/ionic/popup-service.mock';
import { RouterFacadeMock } from '../../../mocks/facades/router-facade.mock';
import { AngularFirestoreMock } from './../../../mocks/angularfire/firestore.mock';
import { ConnectionFacadeMock } from '../../../mocks/facades/connection-facade.mock';

import { SelectTaskListComponent } from './select-task-list.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SelectTaskListComponent', () => {
  let component: SelectTaskListComponent;
  let fixture: ComponentFixture<SelectTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, {
          initialState: { router: initialState.router },
        }),
      ],
      providers: [
        Actions,
        AppFacade,
        ConnectionService,
        {
          provide: PopupService,
          useValue: PopupServiceMock,
        },
        {
          provide: AngularFirestore,
          useValue: AngularFirestoreMock,
        },
        {
          provide: Store,
          useValue: new StoreMock(initialState),
        },
        {
          provide: RouterFacade,
          useValue: RouterFacadeMock,
        },
        {
          provide: ConnectionFacade,
          useClass: ConnectionFacadeMock,
        },
      ],
      declarations: [SelectTaskListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
