import { Migration } from '@mikro-orm/migrations';

export class Migration20211214173301 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `encargado_finca` drop foreign key `encargado_finca_finca_uuid_foreign`;');
    this.addSql('alter table `encargado_finca` drop index `encargado_finca_finca_uuid_unique`;');
    this.addSql('alter table `encargado_finca` drop index `encargado_finca_finca_uuid_index`;');
    this.addSql('alter table `encargado_finca` drop `finca_uuid`;');
  }

}
