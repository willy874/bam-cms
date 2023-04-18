import { ColumnSchemaConfig } from './types';

export class BaseType<D = unknown> {
  protected _index: number | 'auto' = 'auto';
  protected _default: null | D = null;
  protected _nullable = false;
  protected _comment = '';
  protected _primary = false;

  index() {
    this._index = 'auto';
    return this;
  }

  /**
   * Specify a "default" value for the column.
   */
  default(defaultValue: D) {
    this._default = defaultValue;
    return this;
  }

  /**
   * Allow NULL values to be inserted into the column.
   */
  nullable() {
    this._nullable = true;
    return this;
  }

  /**
   * Add a comment to a column (MySQL/PostgreSQL).
   */
  comment(value: string) {
    this._comment = value;
    return this;
  }

  primary() {
    this._primary = true;
    return this;
  }

  protected get config(): ColumnSchemaConfig {
    return {
      index: this._index,
      default: this._default,
      nullable: this._nullable,
      comment: this._comment,
    };
  }
}

export class StringType extends BaseType<string> {
  private _type: string;
  private _length: number;
  private _binary: boolean;

  constructor(type: string, length?: number, binary?: boolean) {
    super();
    this._type = type || 'varchar';
    this._length = length || 255;
    this._binary = binary || false;
  }

  get config() {
    return {
      ...super.config,
      type: this._type,
      length: this._length,
      binary: this._binary,
    };
  }
}

export class NumberType extends BaseType<number> {
  private _length: number;
  private _decimal: number;
  private _autoIncrementing = false;

  constructor(length?: number, decimal?: number) {
    super();
    this._length = length || 11;
    this._decimal = decimal || 0;
  }

  /**
   * Set value of an auto-incrementing field
   */
  autoIncrementing() {
    this._autoIncrementing = true;
    return this;
  }

  get config() {
    return {
      ...super.config,
      type: 'number',
      length: this._length,
      decimal: this._decimal,
      autoIncrementing: this._autoIncrementing,
    };
  }
}

export class DateType extends BaseType<number> {
  private _type: string;
  private _precision: number;
  private _autoDefault = false;

  constructor(type: string, precision?: number) {
    super();
    this._type = type || 'datetime';
    this._precision = precision || 0;
  }

  autoDefault() {
    this._autoDefault = true;
    return this;
  }

  get config() {
    return {
      ...super.config,
      type: this._type,
      precision: this._precision,
      autoDefault: this._autoDefault,
    };
  }
}

export default class DataType {
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
