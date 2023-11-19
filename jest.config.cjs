module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^ui/(.*)$': '<rootDir>/src/shared/ui/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^resources/(.*)$': '<rootDir>/src/resources/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^context/(.*)$': '<rootDir>/src/shared/context/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/main.tsx',
    '!src/setupTests.ts',
  ],
  coverageReporters: ['text'],
};
