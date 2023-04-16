/**
 * @type {import('eslint').Config}
 */
module.exports = {
  env: {
    node: true,
  },
  extends: [require.resolve('./eslint.base')],
};
