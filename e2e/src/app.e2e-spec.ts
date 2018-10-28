import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  xit("should display welcome message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("JuntoScope");
  });

  xit("should contain 'oyster'", () => {
    page.navigateTo();
    expect(page.getContentText()).toContain("oyster");
  });
});
