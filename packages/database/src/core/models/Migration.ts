import TableBlueprint from './TableBlueprint';
import { MigrationInfo } from './types';

export default abstract class Migration {
  protected _info: MigrationInfo[] = [];
  abstract up(): void | Promise<void>;
  abstract down(): void | Promise<void>;

  async create(name: string, callback?: (table: TableBlueprint) => void | Promise<void>) {
    const table = new TableBlueprint().name(name);
    await callback(table);
    return this._info.concat({
      action: 'CREATE',
      table: table.config.name,
      columns: table.config.columns,
    });
  }

  async alter(name: string, callback?: (table: TableBlueprint) => void | Promise<void>) {
    const table = new TableBlueprint().name(name);
    await callback(table);
    return this._info.concat({
      action: 'ALTER',
      table: table.config.name,
      columns: table.config.columns,
    });
  }

  async drop(name: string, callback?: (table: TableBlueprint) => void | Promise<void>) {
    const table = new TableBlueprint().name(name);
    await callback(table);
    return this._info.concat({
      action: 'DROP',
      table: table.config.name,
      columns: [],
    });
  }
}
