import { browser, element, by, ElementFinder } from "protractor";

describe("Example E2E Test", () => {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
  });

  it("the login page is displayed by default", () => {
    browser.get("http://localhost:8100/#/LoginPage");

    var checkbox = element(by.css("ion-checkbox"));

    checkbox.click();

    browser.pause();

    // expect(checkbox).toBeTruthy();
  });
});
