import path from 'node:path';
import { getWorkspaceInfo } from '../workspace';

describe('workspace', () => {
  it('getWorkspaceInfo', async () => {
    const cwd = path.join(process.cwd(), '../../');
    const workspaces = await getWorkspaceInfo(cwd);
    const received = workspaces.length;
    const expected = 10;
    expect(received).toBe(expected);
  });
});
