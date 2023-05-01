import { ColumnSchemaConfig } from './types';

export class BaseType<D = unknown> {
  protected _index: number | 'auto' = 'auto';
  protected _default: null | D = null;
  protected _comment = '';
  protected _nullable = false;
  protected _primaryKey = false;
  protected _foreignKey = false;

  index(index?: number) {
    if (typeof index === 'undefined') {
      this._index = 'auto';
    } else {
      this._index = index;
    }
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

  primaryKey() {
    this._primaryKey = true;
    return this;
  }

  foreignKey() {
    this._foreignKey = true;
    return this;
  }

  protected get config(): ColumnSchemaConfig {
    return {
      index: this._index,
      default: this._default,
      nullable: this._nullable,
      comment: this._comment,
      primary: this._primaryKey,
      foreign: this._foreignKey,
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
