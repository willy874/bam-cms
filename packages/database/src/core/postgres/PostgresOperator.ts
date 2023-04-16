import { events, pg } from '../../libs';
import { Connection, SqlOperator } from '../models';

const { EventEmitter } = events;
const { Client } = pg;
type Client = pg.Client;
type QueryResultRow = pg.QueryResultRow;
type QueryResult<T extends QueryResultRow = any> = pg.QueryResult<T>;
type QueryConfig<T extends any[] = any[]> = pg.QueryConfig<T>;

export default class PostgresOperator extends EventEmitter implements SqlOperator {
  private _client: Client;

  connect(options: Partial<Connection>): Promise<void> {
    this._client = new Client(options);
    this.emit('connect', this._client);
    return Promise.resolve();
  }

  disconnect(): Promise<void> {
    this._client.end();
    this.emit('disconnect', this._client);
    return Promise.resolve();
  }

  query<T extends QueryResultRow, I extends any[]>(
    text: string,
    options: Omit<QueryConfig<I>, 'text'> = {}
  ): Promise<QueryResult<T>> {
    return this._client.query({ ...options, text }).then((results) => {
      this.emit('result', results);
      return results;
    });
  }
}
