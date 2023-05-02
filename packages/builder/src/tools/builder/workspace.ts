import fs from 'node:fs';
import { CWD } from '@/constants';
import { isFile, isDirectory, isArray, pathResolve, getPackageJson } from '@/utils';
import type { Workspaces, WorkspaceInfo } from '@/types';

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

export async function getWorkspaces(configWorkspaces?: Workspaces) {
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
