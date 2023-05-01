import path from 'node:path';
import fs from 'node:fs';
import { CWD, ARGS } from '@/constants';
import { dotenv, deepmerge } from '@/libs';
import { PackageJson, Tsconfig } from '@/types';

export const isArray = Array.isArray;

export function pathResolve(...args: string[]) {
  return path.resolve(CWD, ...args);
}

export function isFile(src: string) {
  return fs.existsSync(src) && fs.statSync(src).isFile();
}

export function isDirectory(src: string) {
  return fs.existsSync(src) && !fs.statSync(src).isFile();
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function getArgv() {
  const ARGUMENT_SEPARATION_REGEX = /([^=\s]+)=?\s*(.*)/;
  const argv = ARGS.slice(2);
  const parsedArgs: Record<string, string | number | boolean> = {};
  let argName, argValue;
  argv.forEach((p: string) => {
    const arg: RegExpMatchArray | null = p.match(ARGUMENT_SEPARATION_REGEX);
    if (!arg) return;
    arg.splice(0, 1);
    argName = arg[0];
    if (argName.indexOf('-') === 0) {
      argName = argName.slice(argName.slice(0, 2).lastIndexOf('-') + 1);
    }
    argValue = arg[1] !== '' ? (parseFloat(arg[1]).toString() === arg[1] ? +arg[1] : arg[1]) : true;
    parsedArgs[argName] = argValue;
  });
  return parsedArgs;
}

export async function readFile(src: string) {
  try {
    if (!isFile(src)) {
      throw new Error(
        `${ConsoleColors.FgRed}The path ${ConsoleColors.FgBlue}${src}${ConsoleColors.FgRed} is not define!${ConsoleColors.Reset}`
      );
    }
    if (/\.(c)?js$/.test(src)) {
      return require(src);
    }
    if (/\.mjs$/.test(src)) {
      return await import(`${src}`);
    }
    if (/^\.env/.test(src)) {
      const env = await fs.promises.readFile(src);
      return dotenv.parse(env);
    }
    if (/^\.(\w)+rc$/.test(src) || /\.json$/.test(src)) {
      const json = await fs.promises.readFile(src);
      return JSON.parse(json.toString());
    }
    return (await fs.promises.readFile(src)).toString();
  } catch (error) {
    return null;
  }
}

export async function getEnvironment(match = '') {
  const fileList = await fs.promises.readdir(CWD);
  const envs = fileList.filter((p) => new RegExp(`^\\.env(\\.)?${match}$`).test(p));
  const src = pathResolve(envs.find((p) => p) || '');
  if (src) {
    return deepmerge(process.env, await readFile(src));
  }
  return process.env;
}

export async function getConfiguration(keyword: string) {
  try {
    const fileList = await fs.promises.readdir(CWD);
    const fileRegexp = [
      new RegExp(`^${keyword}rc(\\.(m|c)?js(x|on)?)?$`),
      new RegExp(`^${keyword}rc(\\.js(x|on)?)?$`),
      new RegExp(`^${keyword}\\.config\\.(m|c)?js(x|on)?$`),
      new RegExp(`^${keyword}\\.config\\.js(x|on)?$`),
    ];
    const configs = fileList.filter((p) => fileRegexp.some((r) => r.test(p)));
    const src = pathResolve(configs.find((p) => p) || '');
    return await readFile(src);
  } catch (error) {
    return null;
  }
}

export const ConsoleColors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

export function asArray<T>(p: T | T[]) {
  return isArray(p) ? p : [p];
}

export async function getPackageJson(p = `${CWD}`): Promise<null | PackageJson> {
  const path = /\.json$/.test(p) ? p : `${p}/package.json`;
  if (isFile(path)) {
    try {
      const file = await fs.promises.readFile(path, 'utf-8');
      return JSON.parse(file.toString());
    } catch (error) {
      return null;
    }
  }
  return null;
}

export async function getTsConfig(p = CWD): Promise<null | Tsconfig> {
  const path = /\.json$/.test(p) ? p : `${p}/tsconfig.json`;
  if (isFile(path)) {
    try {
      const file = await fs.promises.readFile(path, 'utf-8');
      return JSON.parse(file.toString());
    } catch (error) {
      return null;
    }
  }
  return null;
}
