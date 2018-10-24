exports.config = {
  framework: "jasmine",
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ["./src/**/*.spec.ts", "todo-spec.js"]
};