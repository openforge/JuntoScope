import { Component, OnInit, OnDestroy } from '@angular/core';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { AuthFacade } from '../../../authentication/state/auth.facade';
import { AuthCase } from '../../../authentication/state/auth.reducer';
import { RouterFacade } from '../../../state/router.facade';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnDestroy {
  user$ = this.authFacade.user$;
  connectionTypes = ['Teamwork'];

  constructor(
    private authFacade: AuthFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnDestroy() {}

  connect(type: string) {
    this.routerFacade.navigate({ path: ['/token'] });
  }
}
