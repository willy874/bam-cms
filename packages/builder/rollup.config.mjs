import path from 'node:path';
import fs from 'node:fs';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import tsPath from 'rollup-plugin-tsconfig-paths';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

/**
 * @typedef {Object} AliasOptions
 * @property {RegExp} find
 * @property {string} replacement
 * @property {string[]} resolve
 */
/**
 * @param {AliasOptions[]} options
 * @returns {import('@rollup/plugin-alias').Alias[]}
 */
function createAlias(options) {
  return options.map((data) => {
    return {
      find: data.find,
      replacement: data.replacement,
      customResolver: (target) => {
        return data.resolve.map((p) => `${target}${p}`).find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
      },
    };
  });
}

const baseConfig = [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
        exports: 'named',
      },
    ],
    plugins: [
      alias({
        entries: createAlias([
          {
            find: /^@\/(.*)/,
            replacement: path.resolve(process.cwd(), 'src', '$1'),
            resolve: ['.ts', '/index.ts'],
          },
        ]),
      }),
      resolve(),
      commonjs(),
      esbuild(),
      json(),
    ],
    external: [/node_modules/],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/types.d.ts',
      format: 'esm',
    },
    plugins: [dts(), tsPath()],
  },
];

export default async () => {
  const targetPath = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(targetPath)) {
    await fs.promises.rm(targetPath, {
      recursive: true,
    });
  }
  return baseConfig;
};
