import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AngularFirestore } from 'angularfire2/firestore';

import { ConnectionService } from '../../../connections/services/connection.service';
import { PopupService } from './../../../shared/popup.service';
import { SelectProjectComponent } from './select-project.component';
import { initialState, reducers } from '../../../state/app.reducer';
import { RouterFacade } from './../../../state/router.facade';
import { ConnectionFacade } from '../../state/connection.facade';
import { AppFacade } from '../../../state/app.facade';

import { StoreMock } from './../../../mocks/ngrx/store.mock';
import { PopupServiceMock } from './../../../mocks/ionic/popup-service.mock';
import { RouterFacadeMock } from './../../../mocks/facades/router-facade.mock';
import { ActivatedRouteMock } from './../../../mocks/angular/angular-router.mock';
import { AngularFirestoreMock } from './../../../mocks/angularfire/firestore.mock';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SelectProjectComponent', () => {
  let component: SelectProjectComponent;
  let fixture: ComponentFixture<SelectProjectComponent>;

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
        ConnectionFacade,
        ConnectionService,
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteMock,
        },
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
        {
          provide: PopupService,
          useValue: PopupServiceMock,
        },
        {
          provide: Store,
          useValue: new StoreMock(initialState),
        },
        {
          provide: AngularFirestore,
          useValue: AngularFirestoreMock,
        },
      ],
      declarations: [SelectProjectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
