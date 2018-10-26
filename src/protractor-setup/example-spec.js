// example-spec.js
describe("angularjs homepage", function() {
  it("should exist", function() {
    browser.get("http://localhost:8100/#/LoginPage");

    // element(by.model("yourName")).sendKeys("Julie");

    var container = element(by.css(".jedi"));

    //var greeting = element(by.binding("yourName"));

    expect(container).toBeTruthy();
  });
});
