import { StringType, NumberType, DateType } from './DataType';
import { ColumnSchema } from './types';

type DataType = StringType | NumberType | DateType;
type SchemaParameter = (readonly [string, DataType])[] | { [key: string]: DataType };

export default class Schema {
  private _columns: ColumnSchema[] = [];
  constructor(arg: SchemaParameter) {
    if (Array.isArray(arg)) {
      this._columns = arg.map(([name, schema]) => ({ ...schema.config, name }));
    } else {
      this._columns = Object.entries(arg).map(([name, schema]) => ({ ...schema.config, name }));
    }
  }

  toJSON(): ColumnSchema[] {
    return JSON.parse(JSON.stringify(this._columns));
  }

  static string(length = 255, binary = false) {
    return new StringType('varchar', length, binary);
  }

  static char(length = 255, binary = false) {
    return new StringType('char', length, binary);
  }

  static text(type: 'tiny' | 'medium' | 'long' | 'text' = 'text') {
    return new StringType(type);
  }

  static json(type: 'jsonb' | 'json' = 'json') {
    return new StringType(type);
  }

  static number(length = 11, decimal = 0) {
    return new NumberType(length, decimal);
  }

  static integer(length = 11) {
    return new NumberType(length);
  }

  static float(length = 11, decimal = 10) {
    return new NumberType(length, decimal);
  }

  static date(type = 'datetime', precision = 0) {
    return new DateType(type, precision);
  }
}
