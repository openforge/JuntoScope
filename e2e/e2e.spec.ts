import { browser, element, by, ElementFinder } from "protractor";

describe("Example E2E Test", () => {
  beforeEach(() => {});

  it("the login page is displayed by default", () => {
    browser.get("http://localhost:8100/#/LoginPage");

    // var container = element(by.css(".container"));
    // var agreeCheckboxLabel = element(by.xpath("/html/body/ion-app/ng-component/ion-nav/app-login/ion-content/div[2]/div/button[3]/span"));

    // var clickAgree = element(by.css('[name="agree"]'));
    //clickAgree.click();

    var twitterButton = element(by.partialButtonText("Twitter"));

    // expect(twitterButton).toBeFalsy();

    // expect(container).toBeTruthy();
    // expect(agreeCheckboxLabel.getText()).toEqual('Twitter');
  });
});
