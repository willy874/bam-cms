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
}

export type ColumnsTypeConfig = NumberType | StringType | DateType; // | BooleanType | EnumType;

export type ColumnSchema = Omit<ColumnSchemaConfig, 'index'>;

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
}

export type TableOperator = 'CREATE' | 'ALTER' | 'DROP';

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

export interface MigrationInfo {
  action: TableOperator;
  table: string;
  column: string;
  config: ColumnSchema;
}
