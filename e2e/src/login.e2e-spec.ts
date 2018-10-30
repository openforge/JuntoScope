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
    browser.sleep(2000);
  });

  it("should be true for 'aria-checked' when the checkbox was clicked.", () => {
    const checkbox = page.getCheckbox("[role='checkbox']");
    expect(checkbox.getAttribute("aria-checked")).toEqual("true");
  });

  it("should open Terms of Service and Privacy Policy", () => {
    const termsLinks = page.getTermsLinks();
    termsLinks.get(0).click();
    browser.sleep(1000);
    expect(termsLinks.get(0)).toBeTruthy();

    termsLinks.get(1).click();
    browser.sleep(2000);
    expect(termsLinks.get(1)).toBeTruthy();
  });
});
