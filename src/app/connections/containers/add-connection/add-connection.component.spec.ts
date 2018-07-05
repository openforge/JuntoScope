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
import { ConnectionFacadeMock } from './../../../mocks/facades/connection-facade.mock';
import { PopupServiceMock } from './../../../mocks/ionic/popup-service.mock';
import { AngularFirestoreMock } from './../../../mocks/angularfire/firestore.mock';

import { AddConnectionComponent } from './add-connection.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { By } from '@angular/platform-browser';

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
          provide: ConnectionFacade,
          useValue: ConnectionFacadeMock,
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

  it('Should set default connection type to teamwork if there is no type', () => {
    component.type = '';

    spyOn(component, 'setType');

    const button = fixture.debugElement.query(By.css('ion-button'));

    button.triggerEventHandler('click', null);

    expect(component.setType).toHaveBeenCalledWith('teamwork');
  });

  describe('Connection form', () => {
    it('Connection form should initially be invalid', () => {
      expect(component.connectionForm.valid).toBeFalsy();
    });

    it('Token field should be required', () => {
      let errors = {};
      const token = component.connectionForm.controls['token'];

      errors = token.errors || {};

      expect(errors['required']).toBeTruthy();
    });

    describe('Invalid Form', () => {
      it('Should throw an error when there is no token', () => {
        const token = component.connectionForm.controls['token'];

        token.setValue('');

        fixture.detectChanges();

        const error = fixture.debugElement.query(By.css('.error'));

        fixture.detectChanges();

        expect(token.valid).toBeFalsy();
        expect(error).toBeDefined();
      });
    });

    describe('Valid Form', () => {
      beforeEach(() => {
        component.type = 'teamwork';

        const token = component.connectionForm.controls['token'];

        token.setValue('E3O98A');
      });

      it('Connection form should become valid when a valid token is entered into the form', () => {
        expect(component.connectionForm.valid).toBeTruthy();
      });

      it('Should call the continue function when the form is submitted', () => {
        spyOn(component, 'continue');

        fixture.detectChanges();

        const form = fixture.debugElement.query(By.css('form'));

        form.triggerEventHandler('submit', null);

        fixture.detectChanges();

        expect(component.continue).toHaveBeenCalled();
      });

      it('Should call the addConnection function', () => {
        spyOn(component, 'continue');

        component.continue();

        spyOn(this.connectionFacade, 'addConnection');

        fixture.detectChanges();

        expect(this.connectionFacade.addConnection).toHaveBeenCalled();
      });
    });
  });
});
