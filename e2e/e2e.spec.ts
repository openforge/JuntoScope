import { browser, element, by, ElementFinder } from "protractor";

describe("Example E2E Test", () => {
  it("the login page is displayed by default", () => {
    // browser.get("http://localhost:8100/#/LoginPage");

    // var introText = element(by.css(".container p")).getText();

    // var textContent = "First, we need a way of identifying your participation.";

    // expect(introText).toContain(textContent);

    browser.get("http://localhost:8100/#/LoginPage");

    // var container = element(by.css(".container"));
    var agreeCheckboxLabel = element(by.css("ion-label"));

    // expect(container).toBeTruthy();
    expect(agreeCheckboxLabel.getText()).toEqual("I Agree");
  });
});
