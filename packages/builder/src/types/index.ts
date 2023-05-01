import type { RollupOptions as IRollupOptions } from 'rollup';
import { Alias as IRollupAlias } from '@rollup/plugin-alias';
import type { PackageJson as IPackageJson } from 'type-fest';
import type { Tsconfig as ITsconfig } from 'tsconfig-type';

export type RollupOptions = IRollupOptions;

export type RollupAlias = IRollupAlias;

export type PackageJson = IPackageJson;

export type Tsconfig = ITsconfig;

export type Workspaces = IPackageJson['workspaces'] | string;

export type RollupOptionsHandler = () =>
  | RollupOptions
  | RollupOptions[]
  | Promise<RollupOptions | RollupOptions[]>;

export type RollupExportOption =
  | RollupOptions
  | RollupOptions[]
  | RollupOptionsHandler;

export interface Configuration {
  rollup: RollupExportOption;
  workspaces?: Workspaces;
}

export interface WorkspaceInfo {
  name: string;
  main: string;
}
