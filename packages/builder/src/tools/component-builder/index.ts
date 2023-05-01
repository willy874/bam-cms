import fs from 'node:fs';
import { CWD } from '@/constants';
import { isFile, isDirectory, isArray, pathResolve, asArray, getPackageJson, getTsConfig } from '@/utils';
import type { RollupOptions, Configuration, Workspaces, RollupExportOption, WorkspaceInfo } from '@/types';

async function packageMainPath(relativePaths: string): Promise<WorkspaceInfo | null> {
  const absPath = pathResolve(CWD, relativePaths);
  const packagePath = pathResolve(absPath, 'package.json');
  const packageJson = await getPackageJson(packagePath);
  if (packageJson) {
    const mainPath = packageJson.main || 'index.js';
    return {
      name: packageJson.name || `${Date.now()}`,
      main: pathResolve(absPath, mainPath as string),
    };
  }
  const mainPath = pathResolve(absPath, 'main.ts');
  if (isFile(mainPath)) {
    return { name: 'main', main: mainPath };
  }
  const indexPath = pathResolve(absPath, 'index.ts');
  if (isFile(indexPath)) {
    return { name: 'index', main: indexPath };
  }
  return null;
}

async function recursivePaths(path: string): Promise<WorkspaceInfo[]> {
  const paths = path.split('/').filter(Boolean);
  const absPath = pathResolve(CWD, ...paths);
  const mainPath = await packageMainPath(path);
  if (mainPath) return [mainPath];
  const files = await fs.promises.readdir(absPath).catch(() => []);
  const folders = files.map((p) => `${paths.join('/')}/${p}`).filter((p) => isDirectory(pathResolve(CWD, p)));
  const f = await Promise.all(folders.map((p) => recursivePaths(p)));
  return f.flat();
}

async function resolveWorkspaces(workspaces: string[]): Promise<WorkspaceInfo[]> {
  const workspacesPath = await Promise.all(
    workspaces.map(async (p) => {
      if (/\/\*$/.test(p)) {
        return await recursivePaths(p.replace(/\/(\*)+$/, ''));
      } else {
        const mainPath = await packageMainPath(p);
        if (mainPath) return [mainPath];
        return [];
      }
    })
  );
  return workspacesPath.flat();
}

async function getWorkspaces(configWorkspaces?: Workspaces) {
  const packageJson = await getPackageJson();
  const workspaces =
    packageJson && 'workspaces' in packageJson ? (packageJson.workspaces as Workspaces) : configWorkspaces;
  if (typeof workspaces === 'undefined') {
    return resolveWorkspaces(['src']);
  }
  if (typeof workspaces === 'string') {
    return resolveWorkspaces([workspaces]);
  }
  if (isArray(workspaces)) {
    return resolveWorkspaces(workspaces);
  }
  const nohoist = workspaces.nohoist || [];
  const w = await resolveWorkspaces(workspaces.packages || []);
  const regexp = new RegExp(nohoist.join('|'));
  return w.filter((w) => !regexp.test(w.main));
}

async function getRollupOptions(options: RollupExportOption) {
  if (typeof options === 'function') {
    return asArray(await options());
  }
  return asArray(options);
}

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

async function resolveConfig(config: Configuration) {
  const workspaces = await getWorkspaces(config.workspaces);
  const rollupOptions = await getRollupOptions(config.rollup);
  return {
    workspaces,
    rollupOptions,
  };
}

/**
 * @param {Configuration} config
 * @returns {Promise<RollupOptions[]>}
 */
export async function componentBuilder(config: Configuration): Promise<RollupOptions[]> {
  const { rollupOptions, workspaces } = await resolveConfig(config);
  const o1 = await assignWorkspaces(rollupOptions, workspaces);
  return o1;
}
