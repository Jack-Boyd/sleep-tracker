module.exports = {
  displayName: "e2e",
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["/**/__tests__/e2e/?(*.)+(spec|test).[jt]s"],
  forceExit: true,
};