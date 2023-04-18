import TableBlueprint from './TableBlueprint';
import { MigrationInfo } from './types';

export default abstract class Migration {
  abstract name: string;
  abstract up(): void | Promise<void>;
  abstract down(): void | Promise<void>;

  constructor(private blueprint: TableBlueprint) {}

  async create(name: string, callback: (table: TableBlueprint) => void | Promise<void>) {
    return await callback(this.blueprint.name(name));
  }

  async alter(name: string, callback: (table: TableBlueprint) => void | Promise<void>) {
    return await callback(this.blueprint);
  }

  async drop(name: string, callback: (table: TableBlueprint) => void | Promise<void>) {
    return await callback(this.blueprint);
  }
}
