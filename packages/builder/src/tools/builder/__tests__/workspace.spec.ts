import path from 'node:path';
import { getWorkspaceInfo } from '../workspace';

describe('workspace', () => {
  it('getWorkspaceInfo', async () => {
    const cwd = path.join(process.cwd(), '../../');
    const workspaces = await getWorkspaceInfo(cwd);
    expect(workspaces.map((p) => p.name)).toEqual([
      '@bam/api',
      '@bam/builder',
      '@bam/cli',
      '@bam/database',
      '@bam/tools',
      '@bam/ui',
      '@bam/utils',
      '@bam/web',
    ]);
  });
});
