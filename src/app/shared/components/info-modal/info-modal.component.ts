import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopupService } from '@app/shared/popup.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  title;
  text;
  label;
  callback;

  constructor(private popupSvc: PopupService, private params: NavParams) {}

  ngOnInit() {
    this.title = this.params.data.title;
    this.text = this.params.data.text;
    this.label = this.params.data.label;
    this.callback = this.params.data.callback;
  }

  dismiss() {
    this.callback();
    this.popupSvc.closeModal();
  }
}
