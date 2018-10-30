import { browser, element, by } from "protractor";

describe("E2E testing for Login Page", () => {
  let loginBtns;

  beforeAll(() => {
    browser.get("http://localhost:8100/#/LoginPage");
    browser.waitForAngularEnabled(false);
    loginBtns = element.all(by.css(".container button"));
  });

  it("should not be able to login before the agree checkbox has been clicked", () => {
    expect(loginBtns.get(0).isEnabled()).toBe(false);
    expect(loginBtns.get(1).isEnabled()).toBe(false);
    expect(loginBtns.get(2).isEnabled()).toBe(false);
  });
});
