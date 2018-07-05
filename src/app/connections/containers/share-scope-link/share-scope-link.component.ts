import { Component, OnInit, Input } from '@angular/core';

import { NavParams } from '@ionic/angular';

import { RouterFacade } from './../../../state/router.facade';

import { PopupService } from './../../../shared/popup.service';

@Component({
  selector: 'app-share-scope-link',
  templateUrl: './share-scope-link.component.html',
  styleUrls: ['./share-scope-link.component.scss'],
})
export class ShareScopeLinkComponent implements OnInit {
  connectionName;
  projectName;
  sessionUrl;
  accessCode;

  constructor(
    private params: NavParams,
    private routerFacade: RouterFacade,
    private popupSvc: PopupService
  ) {}

  ngOnInit() {
    this.connectionName = this.params.data.connectionName;
    this.projectName = this.params.data.projectName;
    this.sessionUrl = this.params.data.sessionUrl;
    this.accessCode = this.params.data.accessCode;
  }

  startScoping() {
    console.log('Going scoping');
    this.popupSvc.closeModal();
    this.routerFacade.navigate({ path: [`/scoping/${this.sessionUrl}`] });
  }

  goDashboard() {
    this.popupSvc.closeModal();
    this.routerFacade.navigate({
      path: ['/dashboard'],
    });
  }
}
