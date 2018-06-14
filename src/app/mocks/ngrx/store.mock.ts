import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operator/map';

export class StoreMock<T> extends BehaviorSubject<T> {
  constructor(private initialState: T) {
    super(initialState);
  }

  dispatch(action: Action): void {}

  select<M, U>(pathOrMapFn: any, ...paths: string[]): Observable<U> {
    return map.call(this, pathOrMapFn);
  }
}
