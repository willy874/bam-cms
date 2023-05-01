import type { StringType, NumberType, DateType } from './DataType';

export { StringType, NumberType, DateType };

export interface ColumnSchemaConfig {
  index: number | 'auto';
  default: any | null;
  nullable: boolean;
  comment: string;
  type?: string;
  length?: number;
  binary?: boolean;
  decimal?: number;
  autoIncrementing?: boolean;
  precision?: number;
  autoDefault?: boolean;
  primary?: boolean;
  foreign?: boolean;
}

export type ColumnSchema = ColumnSchemaConfig & { name: string };

export type ColumnsTypeConfig = NumberType | StringType | DateType; // | BooleanType | EnumType;

export interface Connection {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
  charset: string;
}

export interface SqlOperator {
  connect(options: Partial<Connection>): Promise<void>;
  disconnect(): Promise<void>;
  query(sql: string, options: any): Promise<any>;
}
