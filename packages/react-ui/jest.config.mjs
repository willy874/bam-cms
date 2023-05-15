/**
 * @type {import('jest').Config}
 */
const config = {
  roots: ['<rootDir>/packages', '<rootDir>/tests/__tests__'],
  modulePaths: ['<rootDir>/packages'],
  collectCoverageFrom: ['packages/**/*.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^#/(.*)$': '<rootDir>/packages/$1',
  },
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]s?(x)$',
  ],
  moduleDirectories: ['node_modules', 'packages', 'tests'],
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
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  verbose: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '^.+\\.d\\.ts$'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
};
export default config;
