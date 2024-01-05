/** @type {import('ts-jest').JestConfigWithTsJest} */
export default  {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testEnvironment: 'jsdom',
  globals: {
    window: {}
  },
};