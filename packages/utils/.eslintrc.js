/**
 * @type {import('eslint').Config}
 */
module.exports = {
  overrides: [
    {
      files: ['packages/base/*'],
      env: {
        node: false,
        browser: false,
      },
    },
    {
      files: ['packages/browser/*'],
      env: {
        node: false,
        browser: true,
      },
    },
  ],
  extends: [require.resolve('../../eslint.base')],
};
