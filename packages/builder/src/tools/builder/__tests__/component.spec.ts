import path from 'node:path';
import { componentBuilder } from '../component';
import { setOption } from '../options';
import { rollupOptions } from '../../options';

describe('component', () => {
  it('componentBuilder', async () => {
    const cwd = path.join(process.cwd(), '../utils');
    setOption({ cwd });
    const rollup = await componentBuilder({
      rollup: [rollupOptions.base, rollupOptions.dts],
    });
    const options = await rollup({});
    const received = Boolean(options);
    const expected = true;
    expect(received).toBe(expected);
  });
});
