import { ColumnsTypeConfig, ColumnSchema } from './types';

type TableSchema = {
  [column: string]: ColumnSchema[];
};

type InfoBlueprint = {
  [table: string]: TableSchema;
};

export default class TableBlueprint {
  protected _info: InfoBlueprint = {};
  protected _table = '';
  protected _action = '';

  name(tableName: string) {
    this._table = tableName;
    return this;
  }

  column(columnName: string, value: ColumnsTypeConfig) {
    const tableName = this._table;
    const { index, ...config } = value.config;
    if (!this._info[columnName]) {
      this._info[columnName] = {};
    }
    if (!this._info[columnName][tableName]) {
      this._info[columnName][tableName] = [];
    }
    const column = this._info[columnName][tableName];
    if (index === 'auto') {
      column.push(config);
    } else {
      column.splice(index, 0, config);
    }
    return this;
  }

  schema(data: { [column: string]: ColumnsTypeConfig }) {
    Object.entries(data).forEach(([key, value]) => {
      this.column(key, value);
    });
    return this;
  }

  protected get config() {
    return this._info;
  }
}
