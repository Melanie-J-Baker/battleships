/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // or "jsdom" if you need DOM APIs
  roots: ["<rootDir>/tests"], // keep your test files here
  moduleFileExtensions: ["ts", "tsx", "js"],
};
