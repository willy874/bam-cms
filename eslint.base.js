/**
 * @type {import('eslint').Config}
 */
module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['node_modules', 'dist'],
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'prettier/prettier': ['error', require('./prettier.config')],
  },
};
