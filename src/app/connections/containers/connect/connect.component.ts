import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterFacade } from '@app/state/router.facade';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  connectionTypes = ['teamwork'];

  constructor(private routerFacade: RouterFacade) {}

  ngOnInit() {}

  connect(type: string) {
    this.routerFacade.navigate({ path: ['/connections/' + type] });
  }
}
