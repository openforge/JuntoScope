import { E2etestsPage } from "./app.po";

describe("mosh-integrationtests App", () => {
  let page: E2etestsPage;

  beforeEach(() => {
    page = new E2etestsPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});
