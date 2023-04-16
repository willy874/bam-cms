import { ColumnsTypeConfig, ColumnSchema } from './types';

export default class TableBlueprint {
  protected _columns: ColumnSchema[] = [];
  protected _name = '';

  name(value: string) {
    this._name = value;
    return this;
  }

  column(name: string, value: ColumnsTypeConfig) {
    const { index, ...config } = value.config;
    if (index === 'auto') {
      this._columns.push({ name, ...config });
    } else {
      this._columns.splice(index, 0, { name, ...config });
    }
    return this;
  }

  schema(data: { [key: string]: ColumnsTypeConfig }) {
    Object.entries(data).forEach(([key, value]) => {
      this.column(key, value);
    });
    return this;
  }

  get config() {
    if (this._name === '') {
      throw new Error('Table name is required');
    }
    return {
      name: this._name,
      columns: this._columns,
    };
  }
}
