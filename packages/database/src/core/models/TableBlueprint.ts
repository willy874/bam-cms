import Schema from './Schema';

interface CreateAction {
  type: 'create';
  table: string;
  payload: Schema;
}

interface DropAction {
  type: 'drop';
  table: string;
}

interface AlterAction {
  type: 'alter';
  table: string;
  payload: Schema;
}

type Action = CreateAction | DropAction | AlterAction;

export default class TableBlueprint {
  private _actions: Action[] = [];

  create(table: string, schema: Schema) {
    this._actions = this._actions.concat({
      type: 'create',
      table,
      payload: schema,
    });
    return this;
  }

  alter(table: string, schema: Schema) {
    this._actions = this._actions.concat({
      type: 'alter',
      table,
      payload: schema,
    });
    return this;
  }

  drop(table: string) {
    this._actions = this._actions.concat({
      type: 'drop',
      table,
    });
    return this;
  }
}
