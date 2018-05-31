import { Component, OnInit } from '@angular/core';
import { RouterFacade } from '../../../state/router.facade';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  constructor(public routerFacade: RouterFacade) {}

  ngOnInit() {}
}
