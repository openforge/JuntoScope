import { browser, by, element } from "protractor";

export class LoginPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get("http://localhost:8100/#/LoginPage");
  }

  getLoginButtons() {
    return element.all(by.css(".container button"));
  }

  getCheckbox(description) {
    return element(by.css(description));
  }

  getParagraphText() {
    return element(by.css("ion-label")).getText();
  }

  getContentText() {
    return element(by.css("button")).getText();
  }
}
