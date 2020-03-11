module.exports = {
    rootDir: './../',
    transform: {
      '^.+\\.(tsx?|jsx?)$': 'ts-jest',
    },
    collectCoverage: false,
    testPathIgnorePatterns: [
      '<rootDir>/__tests__/__mocks__/', 
    ],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
      "@components(.*)$": "<rootDir>/src/components/$1",
      "@context(.*)$": "<rootDir>/src/context/$1",
      "@lib(.*)$": "<rootDir>/src/lib/$1",
      "@src_types(.*)$": "<rootDir>/src/types/$1",
      "@develop_components(.*)$": "<rootDir>/develop/components/$1",
      "@develop_lib(.*)$": "<rootDir>/develop/lib/$1",
    },
    setupFilesAfterEnv: [
      "<rootDir>/__jest__/global.setup.js",
    ],
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{tsx,ts}",
    ]
  }