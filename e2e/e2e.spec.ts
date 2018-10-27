import { browser, element, by, ElementFinder } from "protractor";

describe("Example E2E Test", () => {
  // So far, this test has a timeout error any time I try almost any expect() statement besides "toBeTruthy()"
  // Also timeout error when I try something like clicking the checkbox for "I Agree". Might not be getting the element properly
  it("the login page is displayed by default", () => {
    browser.get("http://localhost:8100/#/LoginPage");

    var checkbox = element(by.tagName("ion-checkbox"));
    checkbox.click();
  });
});
