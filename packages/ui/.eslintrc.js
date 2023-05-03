/**
 * @type {import('eslint').Linter.BaseConfig}
 */
module.exports = {
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['.storybook/*'],
      env: {
        node: true,
      },
    },
    {
      files: ['tests/*'],
      env: {
        jest: true,
      },
    },
  ],
  extends: [require.resolve('../../eslint.base')],
};
