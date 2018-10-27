import { browser, element, by, ElementFinder } from "protractor";

describe("Example E2E Test", () => {
  beforeEach(() => {
    browser.get("http://localhost:8100/#/LoginPage");
  });

  // So far, this test times out any time I try almost any expect() statement besides "toBeTruthy()"
  it("the login page is displayed by default", () => {
    var greeting = element(by.css("div p"));

    expect(greeting.getText()).toContain("First");

    // expect(twitterButton).toBeFalsy();

    // expect(container).toBeTruthy();
    // expect(agreeCheckboxLabel.getText()).toEqual('Twitter');
  });
});
