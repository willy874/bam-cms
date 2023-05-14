import fs from 'node:fs';
import path from 'node:path';
import { yaml, minimatch } from '@/libs';
import { isFile, isArray, pathResolve, getPackageJson, deepDirectory } from '@/utils';
import type { Workspaces, WorkspaceInfo, PackageJson } from '@/types';

async function packageMainPath(dir: string, main?: string | null): Promise<string> {
  if (main) {
    return pathResolve(dir, main);
  }
  const mainPath = pathResolve(dir, 'main.ts');
  if (isFile(mainPath)) {
    return mainPath;
  }
  const indexPath = pathResolve(dir, 'index.ts');
  if (isFile(indexPath)) {
    return indexPath;
  }
  throw new Error("Can't find main file!");
}

async function toWorkspaceInfo(dir: string, packageJson: PackageJson): Promise<WorkspaceInfo> {
  return {
    name: packageJson.name || `${Date.now()}`,
    main: await packageMainPath(dir, packageJson.main),
    workspaces: packageJson.workspaces ? await getWorkspaceInfo(dir, packageJson.workspaces) : [],
  };
}

async function resolveWorkspaces(src: string, workspaces: string[]): Promise<WorkspaceInfo[]> {
  const packages: Record<string, PackageJson> = {};
  await deepDirectory(src, async (dir) => {
    if ([/node_modules$/].some((r) => r.test(dir))) return false;
    const packagePath = path.join(dir, 'package.json');
    const packageJson = await getPackageJson(packagePath);
    const isMatch = workspaces.some(async (pattern) => {
      console.log('isMatch', dir, minimatch(dir, path.join(src, pattern)));
      return minimatch(packagePath, path.join(src, pattern));
    });
    if (packageJson && isMatch) {
      packages[dir] = packageJson;
      return false;
    }
    return true;
  });
  return Promise.all(Object.entries(packages).map((entry) => toWorkspaceInfo(...entry)));
}

export async function getWorkspaces(src: string) {
  const packageJson = await getPackageJson(src);
  if (isFile(pathResolve(src, 'pnpm-lock.yaml'))) {
    const file = fs.readFileSync(pathResolve(src, 'pnpm-workspace.yaml'), 'utf8');
    const pnpmWorkspace: { packages: string[] } = yaml.parse(file);
    return pnpmWorkspace.packages;
  }
  if (packageJson && 'workspaces' in packageJson) {
    return packageJson.workspaces;
  }
  return [];
}

export async function getWorkspaceInfo(src: string, configWorkspaces?: Workspaces) {
  const workspaces = configWorkspaces || (await getWorkspaces(src));
  if (typeof workspaces === 'undefined') {
    const packageJson = await getPackageJson();
    const info = {
      name: packageJson?.name || `${Date.now()}`,
      main: pathResolve(src, 'src/index.ts'),
    };
    return Promise.resolve([info]);
  }
  if (typeof workspaces === 'string') {
    return resolveWorkspaces(src, [workspaces]);
  }
  if (isArray(workspaces)) {
    return resolveWorkspaces(src, workspaces);
  }
  const nohoist = workspaces.nohoist || [];
  const w = await resolveWorkspaces(src, workspaces.packages || []);
  return w.filter((w) => !nohoist.some((p) => w.main && minimatch(w.main, pathResolve(p))));
}
