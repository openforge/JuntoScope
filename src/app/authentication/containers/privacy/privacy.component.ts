import { Component, OnInit } from '@angular/core';
import { RouterFacade } from '@app/state/router.facade';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  constructor(public routerFacade: RouterFacade) {}

  ngOnInit() {}
}
