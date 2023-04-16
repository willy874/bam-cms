import { dotenv, dotenvExpand } from '../libs';

dotenvExpand.expand(dotenv.config());

export const DATABASE_TYPE = process.env.DATABASE_TYPE || '';
export const DATABASE_HOST = process.env.DATABASE_HOST || '';
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 0;
export const DATABASE_NAME = process.env.DATABASE_NAME || '';
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || '';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
