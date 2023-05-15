import fs from 'node:fs';
import path from 'node:path';

import { componentBuilder, rollupOptions } from '@bam/builder';

export default async (...args) => {
  const targetPath = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(targetPath)) {
    await fs.promises.rm(targetPath, {
      recursive: true,
    });
  }
  const options = await componentBuilder({
    rollup: [rollupOptions.base, rollupOptions.dts],
  });
  const r = await options(...args);
  console.log(r);
  console.log('output');
  console.log(r.map((p) => p.output));
  return r;
};
