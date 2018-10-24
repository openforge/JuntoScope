const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  framework: "jasmine",
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ["src/**/**/*.spec.ts", "src/**/**/*.spec.js", "src/**/*-spec.js", "e2e/*.spec.ts"],

  beforeLaunch: () => {
    require("ts-node").register({
      project: "e2e/tsconfig.json"
    });

    require("zone.js/dist/zone-node");
    // require("zone.js/dist/async-test.js");
    // require("zone.js/dist/proxy.js");
  },

  onPrepare: () => {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};