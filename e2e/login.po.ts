import { browser, by, element } from "protractor";

export class LoginPageObject {
  navigateTo() {
    return browser.get("http://localhost:8100/#/LoginPage");
  }
}
