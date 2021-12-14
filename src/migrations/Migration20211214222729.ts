import { Migration } from '@mikro-orm/migrations';

export class Migration20211214222729 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `encargado_finca` add unique `encargado_finca_numero_encargado_finca_unique`(`numero_encargado_finca`);');
  }

}
