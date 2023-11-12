export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/mocks/fileMock.ts',
    '\\.(scss|less|css)$': '<rootDir>/src/tests/mocks/styleMock.ts',
  },
  setupFiles: ['<rootDir>/src/tests/mocks/localStorageMock.ts'],
};
