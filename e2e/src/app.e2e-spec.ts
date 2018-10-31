import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it("should display label as 'I Agree'", () => {
    expect(page.getParagraphText()).toEqual("I Agree");
  });

  it("should display 'FACEBOOK'", () => {
    expect(page.getContentText()).toEqual("FACEBOOK");
  });
});
