exports.config = {
  framework: "jasmine",
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ["src/**/**/*.spec.ts", "src/**/**/*.spec.js", "src/**/*-spec.js"]
};