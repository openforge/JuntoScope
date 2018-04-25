import { Action } from '@ngrx/store';

export class NoopAction implements Action {
  readonly type = '[App] NO-OP';
}
