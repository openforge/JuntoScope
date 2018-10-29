import { browser, element, by, ElementFinder } from "protractor";

describe("Example E2E Test", () => {
  beforeEach(function() {});

  beforeAll(function() {
    browser.get("http://localhost:8100/#/LoginPage");
    // browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  it("should not be able to login before the agree checkbox has been clicked", () => {
    var loginButtons = element.all(by.css(".container > button"));
    var loginButtonsCount;

    loginButtons.count().then(value => {
      loginButtonsCount = value;
    });

    // for (let i=0; i < loginButtonsCount; i++) {
    //   expect(loginButtons.get(i).isEnabled()).toBe(true);
    // }

    expect(loginButtons.get(0).isEnabled()).toBe(false);
    expect(loginButtons.get(1).isEnabled()).toBe(false);
    expect(loginButtons.get(2).isEnabled()).toBe(false);
  });

  it("should click the Agree checkbox", () => {
    var checkbox = element(by.css("[role='checkbox']"));
    checkbox.click();

    browser.sleep(1500);

    expect(checkbox.getAttribute("aria-checked")).toEqual("true");
  });

  it("should click the Twitter button", () => {
    var twitterButton = element(by.css(".container button:nth-of-type(3)"));

    twitterButton.click();

    browser.sleep(6000);

    // browser.pause();
  });
});
