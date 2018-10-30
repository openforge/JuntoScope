import { LoginPage } from "./login.po";
import { browser } from "protractor";

describe("E2E testing for Login Page", () => {
  let page: LoginPage;
  let loginBtns;

  beforeAll(() => {
    page = new LoginPage();
    page.navigateTo();
    loginBtns = page.getLoginButtons();
  });

  it("should not be able to login before the agree checkbox has been clicked", () => {
    expect(loginBtns.get(0).isEnabled()).toBe(false);
    expect(loginBtns.get(1).isEnabled()).toBe(false);
    expect(loginBtns.get(2).isEnabled()).toBe(false);
  });

  it("should click the Agree checkbox and all buttons are enabled.", () => {
    const checkbox = page.getCheckbox("ion-checkbox");
    checkbox.click();
    expect(checkbox).toBeTruthy();
    expect(loginBtns.get(0).isEnabled()).toBe(true);
    expect(loginBtns.get(1).isEnabled()).toBeTruthy();
    expect(loginBtns.get(2).isEnabled()).toBeTruthy();
    browser.sleep(3000);
  });
});
