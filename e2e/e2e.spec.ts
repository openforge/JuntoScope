import {
  browser,
  element,
  by,
  ElementFinder,
  protractor,
  ExpectedConditions
} from "protractor";

describe("Example E2E Test", () => {
  beforeAll(function() {
    browser.get("http://localhost:8100/#/LoginPage");
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

    // browser.sleep(6000);

    browser.getAllWindowHandles().then(value => {
      let EC = protractor.ExpectedConditions;
      console.log(value);
      expect(value[1]).toBeTruthy();
    });
  });

  it("should enter username and password for Twitter popup window and navigate to Dashboard page", () => {
    browser.getAllWindowHandles().then(handles => {
      browser
        .switchTo()
        .window(handles[1])
        .then(() => {
          // let EC = protractor.ExpectedConditions;
          // browser.wait(
          //   EC.presenceOf(element(by.css("#username_or_email"))),
          //   5000
          // );

          // browser.sleep(4000);

          element(by.css("#username_or_email")).sendKeys("samhudgensdev");
          element(by.css("#password")).sendKeys("openforge777");
          element(by.css("#allow")).click();

          browser.sleep(3000);

          browser
            .switchTo()
            .window(handles[0])
            .then(() => {
              let url = browser.getCurrentUrl();
              expect(url).toEqual("http://localhost:8100/#/DashboardPage");

              browser.sleep(2000);

              // expect(joinButton.isEnabled()).toBe(false);
            });
        });
    });
  });

  it("should click Add New Connection button and navigate to the AddConnectionPage", () => {
    // browser.get("http://localhost:8100/#/DashboardPage");

    let addNewConnectionButton = element(by.css(".new-connection"));
    addNewConnectionButton.click();

    browser.sleep(3000);

    let url = browser.getCurrentUrl();
    expect(url).toEqual("http://localhost:8100/#/AddConnectionPage");

    // expect(joinButton.isPresent()).toBe(true);
    // expect(joinButton.isEnabled()).toBe(false);
  });

  it("should click the Accept button on the AddConnectionPage and then hit some cordova error", () => {
    // element(by.css("button")).click();
  });
});
