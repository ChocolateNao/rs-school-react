const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/mock/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/tests/mock/styleMock.js',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^tests/(.*)$': '<rootDir>/src/tests/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/tests/mock/*.ts',
    '!src/pages/_*.tsx'
  ],
  coverageReporters: ['text'],
};

module.exports = createJestConfig(customJestConfig);
