import { CommonModule, Location } from '@angular/common';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule, Store, Action } from '@ngrx/store';
import {
  EffectsMetadata,
  getEffectsMetadata,
  EffectsModule,
} from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable } from 'rxjs/Observable';

import { cold, hot } from 'jest-marbles';

import { ConfigureFn, configureTests } from '../../test/jest-test.helper';
import { AppState, reducers, initialState } from './app.state';
import { RouterFacade } from './router.facade';
import { CustomSerializer } from './router.reducer';
import { Component } from '@angular/core';
import {
  GoAction,
  BackAction,
  ForwardAction,
  RouterActionTypes,
  NavigationOptions,
} from './router.actions';

@Component({
  template: '<div></div>',
})
class TestComponent {}

describe('RouterFacade', () => {
  let location: Location;
  let router: Router;
  let store: Store<AppState>;
  let actions$: Observable<any>;
  let facade: RouterFacade;
  let metadata: EffectsMetadata<RouterFacade>;

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [
          CommonModule,
          RouterTestingModule.withRoutes([
            {
              path: 'test-route/:id',
              component: TestComponent,
            },
          ]),
          StoreModule.forRoot(reducers, { initialState }),
          StoreRouterConnectingModule.forRoot(),
          EffectsModule.forRoot([RouterFacade]),
        ],
        providers: [
          {
            provide: RouterStateSerializer,
            useClass: CustomSerializer,
          },
          RouterFacade,
          provideMockActions(() => actions$),
        ],
      });
    };

    configureTests(configure).then(testBed => {
      location = testBed.get(Location);
      router = testBed.get(Router);
      store = testBed.get(Store);
      facade = testBed.get(RouterFacade);
      metadata = getEffectsMetadata(facade);

      router.initialNavigation();
    });
  }));

  describe('Store Query: state$', () => {
    it('should have the initial router navigation state', () => {
      const testState = { url: '/', params: {}, queryParams: {} };
      const expected = cold('a-', { a: testState });

      expect(facade.state$).toBeObservable(expected);
    });

    it('should observe router state upon navigation', () => {
      const testQueryParam = 'yes';
      const testState = {
        url: '/test-route/1?testQueryParam=yes',
        params: { id: '1' },
        queryParams: { testQueryParam },
      };
      const expected = cold('a-', { a: testState });

      router.navigate(['/test-route', '1'], {
        queryParams: { testQueryParam },
      });

      expect(facade.state$).toBeObservable(expected);
    });
  });

  describe('Store Query: params$', () => {
    it('should have the initial route params', () => {
      const expected = cold('a-', { a: {} });

      expect(facade.params$).toBeObservable(expected);
    });

    it('should observe route params changes', () => {
      const expected = cold('a-', { a: { id: '1' } });

      router.navigate(['/test-route', '1']);

      expect(facade.params$).toBeObservable(expected);
    });
  });

  describe('Store Query: queryParams$', () => {
    it('should have the initial route queryParams', () => {
      const expected = cold('a-', { a: {} });

      expect(facade.params$).toBeObservable(expected);
    });

    it('should observe route queryParams changes', () => {
      const testQueryParam = 'yes';
      const expected = cold('a-', { a: { testQueryParam } });

      router.navigate(['/test-route', '1'], {
        queryParams: { testQueryParam },
      });

      expect(facade.queryParams$).toBeObservable(expected);
    });
  });

  describe('Effect: go$', () => {
    it('should not dispatch another action', () => {
      expect(metadata.go$).toEqual({ dispatch: false });
    });

    it('should call `navigate` on the router with nav options', () => {
      jest.spyOn(router, 'navigate');
      const testPath = ['/test-route/1'];
      const testParams = { test: 'yes' };
      const payload = { path: testPath, query: testParams };
      const action = new GoAction(payload);
      const expected = cold('--b-', { b: action.payload });

      actions$ = hot('--a-', { a: action });

      expect(facade.go$).toBeObservable(expected);
      facade.go$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/test-route/1'], {
          queryParams: testParams,
        });
      });
    });
  });

  describe('Effect: back$', () => {
    it('should not dispatch another action', () => {
      expect(metadata.back$).toEqual({ dispatch: false });
    });

    it('should call `back` on the location service', () => {
      jest.spyOn(location, 'back');
      const action = new BackAction();
      const expected = cold('--b-', { b: action });

      actions$ = hot('--a-', { a: action });

      expect(facade.back$).toBeObservable(expected);
      facade.back$.subscribe(() => {
        expect(location.back).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Effect: forward$', () => {
    it('should not dispatch another action', () => {
      expect(metadata.forward$).toEqual({ dispatch: false });
    });

    it('should call `forward` on the location service', () => {
      jest.spyOn(location, 'forward');
      const action = new ForwardAction();
      const expected = cold('--b-', { b: action });

      actions$ = hot('--a-', { a: action });

      expect(facade.forward$).toBeObservable(expected);
      facade.forward$.subscribe(() => {
        expect(location.forward).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Action Creator: navigate', () => {
    it('should dispatch GoAction', () => {
      let dispatchedAction: Action;
      jest
        .spyOn(store, 'dispatch')
        .mockImplementation(action => (dispatchedAction = action));
      const navOpts: NavigationOptions = {
        path: ['/test-route/1'],
        query: { test: 'yes ' },
      };

      facade.navigate(navOpts);

      expect(dispatchedAction.type).toBe(RouterActionTypes.GO);
    });
  });

  describe('Action Creator: back', () => {
    it('should dispatch BackAction', () => {
      let dispatchedAction: Action;
      jest
        .spyOn(store, 'dispatch')
        .mockImplementation(action => (dispatchedAction = action));

      facade.back();

      expect(dispatchedAction.type).toBe(RouterActionTypes.BACK);
    });
  });

  describe('Action Creator: forward', () => {
    it('should dispatch ForwardAction', () => {
      let dispatchedAction: Action;
      jest
        .spyOn(store, 'dispatch')
        .mockImplementation(action => (dispatchedAction = action));

      facade.forward();

      expect(dispatchedAction.type).toBe(RouterActionTypes.FORWARD);
    });
  });
});
