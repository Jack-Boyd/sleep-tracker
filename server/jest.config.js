/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // projects: [
  //   "<rootDir>/jest.unit.config.js",
  //   "<rootDir>/jest.e2e.config.js",
  // ],
  // clearMocks: true,
  // setupFiles: ['dotenv/config'],
  // roots: ['<rootDir>/src'],
  // moduleDirectories: ['node_modules', 'src'],
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest"
  // },
  // verbose: true,
  // collectCoverage: true,
  // collectCoverageFrom: ['./src/**'],
 
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //   },
  // },
  forceExit: true,
};