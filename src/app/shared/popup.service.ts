import { Component, Injectable } from '@angular/core';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';

@Injectable()
export class PopupService {

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController) {}

  async alert(header: string, subHeader: string, buttonLabel: string) {
    const alert = await this.alertCtrl.create({ header, subHeader, buttons: [buttonLabel] });
    await alert.present();
  }

  async promptYesNo(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: [{ text: 'No' }, { text: 'Yes' }]});
    await alert.present();
  }

  async promptOkCancel(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: [{ text: 'Cancel' }, { text: 'Ok' }]});
    await alert.present();
  }

  async openModal(modalOptions) {
    const modal = await this.modalCtrl.create(modalOptions);
    await modal.present();
  }

  async openPopover(popoverOptions) {
    const popover = await this.popoverCtrl.create(popoverOptions);
    await popover.present();
  }
}
