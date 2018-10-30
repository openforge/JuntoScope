import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    // browser.ignoreSynchronization = true;
    return browser.get("http://localhost:8100/#/LoginPage");
  }

  getParagraphText() {
    return element(by.css("ion-label")).getText();
  }

  getContentText() {
    return element(by.css("button")).getText();
  }
}
