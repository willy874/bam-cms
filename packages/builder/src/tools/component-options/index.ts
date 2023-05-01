import path from 'node:path';
import fs from 'node:fs';
import type { RollupOptions, RollupAlias } from '@/types';
import { rollup } from '@/libs';
const { commonjs, resolve, dts, esbuild, json, alias, postcss } = rollup;

interface AliasOptions {
  find: string | RegExp;
  replacement: string;
  resolve: string[];
}

function createAlias(options: AliasOptions[]): RollupAlias[] {
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

export const rollupOptions: { [k: string]: RollupOptions } = {
  base: {
    output: [
      {
        file: 'index.js',
        format: 'esm',
      },
      {
        file: 'index.mjs',
        format: 'esm',
        exports: 'named',
      },
      {
        file: 'index.cjs',
        format: 'cjs',
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
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
      }),
      esbuild(),
      json(),
    ],
    external: [/node_modules/, /^node:/],
  },
  dts: {
    output: {
      file: 'types.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
};
