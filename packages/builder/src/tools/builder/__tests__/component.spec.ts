import path from 'node:path';
import { componentBuilder } from '../component';
import { setOption } from '../options';

describe('component', () => {
  it('componentBuilder', async () => {
    const cwd = path.join(process.cwd(), '../../');
    setOption({ cwd });
    const rollup = await componentBuilder({
      rollup: {},
    });
    const options = await rollup({});
    // console.log(options);
    const received = Boolean(options);
    const expected = true;
    expect(received).toBe(expected);
  });
});
