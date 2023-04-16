/**
 * @type {import('jest').Config}
 */
const config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  moduleDirectories: ['node_modules', 'tests', 'src'],
  modulePaths: ['<rootDir>/node_modules', '<rootDir>/src'],
  testPathIgnorePatterns: [
    '<rootDir>/tests/server/',
    '<rootDir>/tests/__mocks__/',
    '<rootDir>/tests/mocks/',
    '/node_modules/',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/tests/__mocks__/', '/node_modules/'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '^.+\\.d\\.ts$'],
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]s?(x)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
