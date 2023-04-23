import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from '@/constants';
import { MysqlOperator, Migration, DataType } from '@/core';

(async function () {
  // class TestMigration extends Migration {
  //   async up() {
  //     await this.create('test', (table) => {
  //       table.schema({
  //         id: DataType.integer().autoIncrementing().primary(),
  //         name: DataType.string(),
  //         age: DataType.integer(),
  //         created_at: DataType.date().autoDefault(),
  //         updated_at: DataType.date().autoDefault(),
  //       });
  //     });
  //   }
  //   async down() {
  //     await this.drop('test');
  //   }
  // }
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
