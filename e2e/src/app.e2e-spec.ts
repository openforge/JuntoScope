import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display label as 'I Agree'", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("I Agree");
  });

  it("should display 'FACEBOOK'", () => {
    page.navigateTo();
    expect(page.getContentText()).toEqual("FACEBOOK");
  });
});
