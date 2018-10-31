import { LoginPage } from "./login.po";
import { browser, element, by } from "protractor";

describe("E2E testing for Login Page", () => {
  let page: LoginPage;
  let loginBtns;
  let count;

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
    browser.sleep(1000);
  });

  it("should be true for 'aria-checked' when the checkbox was clicked.", () => {
    const checkbox = page.getCheckbox("[role='checkbox']");
    expect(checkbox.getAttribute("aria-checked")).toEqual("true");
  });

  it("should open Terms of Service and Privacy Policy", () => {
    const termsLinks = page.getTermsLinks();
    termsLinks.get(0).click();
    browser.getAllWindowHandles().then(handles => {
      count = handles.length;
      if (count > 1) {
        browser
          .switchTo()
          .window(handles[count - 1])
          .then(() => {
            browser.sleep(1000);
          })
          .then(() => {
            browser.getTitle().then(title => {
              expect(title).toBe("JuntoScope Terms of Service - Google Docs");
              console.log("title:", title);
            });
          });
        browser.close();
        browser
          .switchTo()
          .window(handles[count - 2])
          .then(() => {
            browser.sleep(2000);
          });
      }
    });

    termsLinks.get(1).click();
    browser.getAllWindowHandles().then(handles => {
      count = handles.length;
      if (count > 1) {
        browser
          .switchTo()
          .window(handles[count - 1])
          .then(() => {
            browser.sleep(2000);
          })
          .then(() => {
            browser.getTitle().then(title => {
              expect(title).toBe("JuntoScope Privacy Policy - Google Docs");
              console.log("title:", title);
            });
          });
        browser.close();
        browser
          .switchTo()
          .window(handles[count - 2])
          .then(() => {
            browser.sleep(2000);
          });
      }
    });
  });

  it("should open a new window to login with Google account.", () => {
    loginBtns.get(1).click();
    browser.getAllWindowHandles().then(handles => {
      let input;
      count = handles.length;
      if (count > 1) {
        browser
          .switchTo()
          .window(handles[count - 1])
          .then(() => {
            browser.sleep(2000);
          })
          .then(() => {
            browser.getTitle().then(title => {
              expect(title).toBe("Sign in - Google Accounts");
              console.log(title);
            });
            input = browser.findElement(by.id("identifierId"));
            input.sendKeys("young@openforge.io");
            browser.sleep(10000);
          });
      }
    });
  });

  it("should diplay user's email at input", () => {});
});
