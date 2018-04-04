module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: "src/client/tsconfig.spec.json"
    },
    __TRANSFORM_HTML__: true
  },
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/client/test/jest-test.ts',
}
