exports.config = {
  framework: "jasmine",
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ["src/**/**/*.spec.ts", "src/**/**/*.spec.js", "src/**/*-spec.js"],

  beforeLaunch: () => {
    require("ts-node").register({
      project: "src/tsconfig.spec.json"
    });
  }
  // onPrepare() {
  //   jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  // }
};