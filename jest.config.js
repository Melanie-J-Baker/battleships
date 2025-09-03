/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // or "jsdom" if you need DOM APIs
  roots: ["<rootDir>/src"], // keep your test files here
  testMatch: ["**/tests/**/*.test.ts"], // match .test.ts files
};
