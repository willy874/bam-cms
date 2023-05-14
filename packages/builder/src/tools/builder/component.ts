import { isArray, pathResolve, asArray, getTsConfig } from '@/utils';
import { getWorkspaceInfo } from './workspace';
import type { RollupOptions, Configuration, RollupExportOption, WorkspaceInfo, RollupOptionsFunction } from '@/types';
import { getOption } from './options';

async function assignRollupOutput(
  name: string,
  options?: RollupOptions['output'],
  isSingle = false
): Promise<RollupOptions['output']> {
  const tsconfig = await getTsConfig();
  const outDir = tsconfig?.compilerOptions?.outDir ?? 'dist';
  const resolvePath = (p: string) => {
    if (isSingle) return pathResolve(outDir, p);
    return pathResolve(outDir, name, p);
  };
  if (typeof options === 'undefined') {
    return {
      file: resolvePath('index.js'),
      format: 'esm',
    };
  }
  if (isArray(options)) {
    return options.map((p) => {
      return {
        ...p,
        file: resolvePath(p.file || 'index.js'),
      };
    });
  }
  return {
    ...options,
    file: resolvePath(options.file || 'index.js'),
  };
}

async function assignWorkspaces(options: RollupOptions[], workspaces: WorkspaceInfo[]) {
  const newOptions = options.map(async (option) => {
    const w = workspaces.map(async (workspace) => {
      const isSingle = workspaces.length === 1;
      return {
        ...option,
        input: workspace.main,
        output: await assignRollupOutput(workspace.name, option.output, isSingle),
      };
    });
    return await Promise.all(w);
  });
  return (await Promise.all(newOptions)).flat();
}

async function getRollupOptions(options: RollupExportOption, args: Record<string, any>) {
  if (typeof options === 'function') {
    return asArray(await options(args));
  }
  return asArray(options);
}

export function componentBuilder(config: Configuration): RollupOptionsFunction {
  return async (commandLineArguments: Record<string, any>) => {
    const { cwd } = getOption();
    const workspaces = await getWorkspaceInfo(cwd, config.workspaces);
    const rollupOptions = await getRollupOptions(config.rollup, commandLineArguments);
    const result = await assignWorkspaces(rollupOptions, workspaces);
    return result;
  };
}
