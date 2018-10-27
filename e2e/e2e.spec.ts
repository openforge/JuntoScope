import { browser, element, by, ElementFinder } from "protractor";

describe("Example E2E Test", () => {
  // So far, this test has a timeout error any time I try almost any expect() statement besides "toBeTruthy()"
  it("the login page is displayed by default", () => {
    browser.get("http://localhost:8100/#/LoginPage");

    var greeting = element(by.css("div p"));

    greeting.getText().then(function(value) {
      console.log(value);

      expect(value).toContain("First");
    });
  });
});
