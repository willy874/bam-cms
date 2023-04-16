import { events, isSet, mysql2 } from '../../libs';
import { ColumnSchema, Connection, SqlOperator } from '../models';
import RESERVED_KEYWORDS from './reserved-keywords';

function filterInjection(name) {
  return RESERVED_KEYWORDS.split(',').some((keyword) => new RegExp(`\\s+${keyword}\\s+`))
    ? `\`${name.replace(/`/g, '')}\``
    : name;
}

function getColumnSql(column: ColumnSchema) {
  const { name, type, length, binary, decimal, autoIncrementing, precision, autoDefault, ...rest } = column;
  let sql = `${filterInjection(name)} ${type?.toUpperCase()}`;
  if (length) sql += `(${length})`;
  if (binary) sql += ' BINARY';
  if (decimal) sql += `(${decimal})`;
  if (autoIncrementing) sql += ' AUTO_INCREMENT';
  if (precision) sql += `(${precision})`;
  if (rest.nullable) sql += ' NULL';
  if (rest.default && !rest.nullable) sql += ` DEFAULT ${rest.default}`;
  if (autoDefault && !isSet(rest.default)) sql += ' DEFAULT CURRENT_TIMESTAMP';
  if (rest.comment) sql += ` COMMENT '${rest.comment}'`;
  return sql;
}

const { EventEmitter } = events;
type MysqlConnection = mysql2.Connection;
type QueryOptions = mysql2.QueryOptions;
type RowDataPacket = mysql2.RowDataPacket;
type OkPacket = mysql2.OkPacket;
type ResultSetHeader = mysql2.ResultSetHeader;
type QueryResults = RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader;

export default class MysqlOperator extends EventEmitter implements SqlOperator {
  private _connection: MysqlConnection;

  connect(options: Partial<Connection>): Promise<void> {
    this._connection = mysql2.createConnection(options);
    this.emit('connect', this._connection);
    return Promise.resolve();
  }

  disconnect(): Promise<void> {
    this._connection.end();
    this.emit('disconnect', this._connection);
    return Promise.resolve();
  }

  query<T extends QueryResults>(sql: string, options: Omit<QueryOptions, 'sql'> = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      const query = this._connection.query<T>({ ...options, sql }, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      query.on('result', (result) => this.emit('result', result));
      query.on('fields', (fields, index) => this.emit('fields', fields, index));
      query.on('error', (error) => this.emit('error', error));
      query.on('end', () => this.emit('end'));
    });
  }

  create(name: string, columns: ColumnSchema[]): Promise<void> {
    const tableName = filterInjection(name);
    const existQuery = `CREATE TABLE IF NOT EXISTS ${tableName}`;
    const columnsQuery = columns.map((column) => getColumnSql(column));
    return this.query(`${existQuery} (\n  ${columnsQuery.join(',\n  ')}\n)`).then(() => Promise.resolve());
  }

  dorp(name: string): Promise<void> {
    const tableName = filterInjection(name);
    const existQuery = `DROP TABLE IF EXISTS ${tableName};`;
    const dropQuery = `DROP TABLE ${tableName};`;
    return this.query(`${existQuery}\n${dropQuery}`).then(() => Promise.resolve());
  }
}
