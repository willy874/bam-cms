import TableBlueprint from './TableBlueprint';

export default abstract class Migration {
  abstract up(table: TableBlueprint): TableBlueprint;
  abstract down(table: TableBlueprint): TableBlueprint;
}
