import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from '@/constants';
import { Migration, MysqlOperator, Schema, TableBlueprint } from '@/core';

class TestMigration extends Migration {
  name = 'test';
  up(table: TableBlueprint): TableBlueprint {
    return table.create(
      this.name,
      new Schema([
        ['id', Schema.integer().autoIncrementing().primaryKey()],
        ['name', Schema.string()],
        ['age', Schema.integer()],
        ['created_at', Schema.date().autoDefault()],
        ['updated_at', Schema.date().autoDefault()],
      ])
    );
  }
  down(table: TableBlueprint): TableBlueprint {
    return table.drop(this.name);
  }
}

(async function () {
  [new TestMigration()].reduce((table, migration) => migration.up(table), new TableBlueprint());

  const operator = new MysqlOperator();
  operator.on('connect', () => console.log('connect'));
  await operator.connect({
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    charset: 'utf8mb4',
  });
})();
