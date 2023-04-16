/**
 * @type {import('eslint').Config}
 */
module.exports = {
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['tests/*'],
      env: {
        jest: true,
      },
    },
  ],
  extends: [require.resolve('./eslint.base')],
};
