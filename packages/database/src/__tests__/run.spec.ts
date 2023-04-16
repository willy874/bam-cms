import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from '@/constants';
import { DataType, Migration, MysqlOperator } from '@/core';

class TestMigration extends Migration {
  up() {
    this.create('test_table', (table) => {
      table.schema({
        id: DataType.number().primary(),
        name: DataType.string(255).nullable(),
        created_at: DataType.date().autoDefault(),
        updated_at: DataType.date().autoDefault(),
      });
    });
  }

  down() {
    this.drop('test_table');
  }
}

describe('Migration', () => {
  it('should be a class', () => {
    expect(new TestMigration()).toBeInstanceOf(Migration);
  });
});

const operator = new MysqlOperator();

beforeEach(async () => {
  await operator.connect({
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    charset: 'utf8',
  });
});

afterEach(async () => {
  await operator.disconnect();
});

describe('MysqlOperator', () => {
  it('should be a class', async () => {
    expect(operator).toBeInstanceOf(MysqlOperator);
  });
});
