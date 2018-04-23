module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: "src/tsconfig.spec.json"
    },
    __TRANSFORM_HTML__: true
  },
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/test/jest-test.ts',
}
