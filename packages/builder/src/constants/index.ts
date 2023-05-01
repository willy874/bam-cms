import packageJson from '../../package.json';

export const PACKAGE_CONFIG = packageJson;

/**
 * Current Working Directory
 * ```js
 * process.cwd()
 *  ```
 */
export const CWD = process.cwd();

const [nodePath, binPath, ...args] = process.argv;

export const NODE_PATH = nodePath;

export const BIN_PATH = binPath;

export const ARGS = args;
