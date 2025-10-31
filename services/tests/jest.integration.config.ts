import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/integration/**/*.spec.ts', '**/*.int.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFiles: [],
  testTimeout: 60000, // integra servicios: dale aire
  verbose: true,
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },
  },
};
export default config;
