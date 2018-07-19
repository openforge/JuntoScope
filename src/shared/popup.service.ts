import { Component, Injectable } from "@angular/core";
import {
  ModalController,
  AlertController,
  PopoverController,
  ViewController
} from "ionic-angular";

@Injectable()
export class PopupService {
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController // private viewController: ViewController
  ) {}

  /**
   * Shows up a simple alert with one button
   * @param title The title for the alert
   * @param message The message for the alert
   * @param buttonLabel The label for the button
   */
  async simpleAlert(title: string, message: string, buttonLabel: string) {
    const alert = await this.alertCtrl.create({
      title,
      message,
      buttons: [{ text: buttonLabel, handler: () => true }]
    });
    await alert.present();
    return alert.onDidDismiss(() => {});
  }

  /**
   * Shows up a simple alert with a custom callback after click on the button
   * @param title The title for the alert
   * @param message The message for the alert
   * @param buttonLabel The label for the button
   * @param callback The callback to fire after click the button
   */
  async customCallbackAlert(
    title: string,
    message: string,
    buttonLabel: string,
    callback: any
  ) {
    const alert = await this.alertCtrl.create({
      title,
      message,
      buttons: [{ text: buttonLabel, handler: callback }]
    });
    await alert.present();
    return alert.onDidDismiss(() => {});
  }

  /**
   * Shows up a simple alert with a custom buttons
   * @param title The title for the alert
   * @param message The message for the alert
   * @param buttons The buttons array with {text, handler} object for each button
   */
  async customButtonsAlert(title: string, message: string, buttons) {
    const alert = await this.alertCtrl.create({ title, message, buttons });
    await alert.present();
    return alert.onDidDismiss(() => {});
  }

  /**
   * Shows up a simple alert with pre defined buttons for Yes/No answer
   * @param title The title for the alert
   * @param message The message for the alert
   */
  async promptYesNo(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      title,
      message,
      buttons: [{ text: "No" }, { text: "Yes" }]
    });
    await alert.present();
  }

  /**
   * Shows up a simple alert with pre defined buttons for Ok/Cancel answer
   * @param title The title for the alert
   * @param message The message for the alert
   */
  async promptOkCancel(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      title,
      message,
      buttons: [{ text: "Cancel" }, { text: "Ok" }]
    });
    await alert.present();
  }

  /**
   * Shows up a modal page
   * @param modalOptions The options object to create the modal
   */
  async openModal(modalOptions) {
    const modal = await this.modalCtrl.create(
      modalOptions.component,
      modalOptions.componentProps
    );
    await modal.present();
  }

  /**
   * Dismiss the modal page
   */
  async closeModal() {
    // this.viewController.dismiss();
  }

  /**
   * Return the top modal
   */
  // async topModl() {
  //   return this.modalCtrl.getTop();
  // }

  /**
   * Shows up a popover
   * @param popoverOptions The options object to create the popover
   */
  async openPopover(popoverOptions) {
    const popover = await this.popoverCtrl.create(popoverOptions);
    await popover.present();
  }
}
