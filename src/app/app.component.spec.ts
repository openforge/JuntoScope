import { AuthFacade } from './authentication/state/auth.facade';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { reducers, initialState } from '../app/state/app.reducer';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { StoreMock } from './mocks/ngrx/store.mock';
import { AngularFireAuthMock } from './mocks/angularfire/angularfireauth.mock';
import { AuthService } from './authentication/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

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
        AuthFacade,
        AuthService,
        {
          provide: AngularFireAuth,
          useValue: AngularFireAuthMock,
        },
        {
          provide: Store,
          useValue: new StoreMock(initialState),
        },
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
