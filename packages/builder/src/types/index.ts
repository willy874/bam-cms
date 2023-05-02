import type { RollupOptions as IRollupOptions, RollupOptionsFunction as IRollupOptionsFunction } from 'rollup';
import { Alias as IRollupAlias } from '@rollup/plugin-alias';
import type { PackageJson as IPackageJson } from 'type-fest';
import type { Tsconfig as ITsconfig } from 'tsconfig-type';

export type RollupOptions = IRollupOptions;

export type RollupOptionsFunction = IRollupOptionsFunction;

export type RollupAlias = IRollupAlias;

export type PackageJson = IPackageJson;

export type Tsconfig = ITsconfig;

export type Workspaces = IPackageJson['workspaces'] | string;

export type RollupExportOption = RollupOptions | RollupOptions[] | RollupOptionsFunction;

export interface Configuration {
  rollup: RollupExportOption;
  workspaces?: Workspaces;
}

export interface WorkspaceInfo {
  name: string;
  main: string;
}
