module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: "src/tsconfig.spec.json"
    },
    __TRANSFORM_HTML__: true
  },
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/test/jest-test.ts',
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@env/(.*)": "<rootDir>/src/environments/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@test/(.*)": "<rootDir>/src/test/$1",
  },
}
