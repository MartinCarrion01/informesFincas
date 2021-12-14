import { Migration } from '@mikro-orm/migrations';

export class Migration20211214172459 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `encargado_finca` add `finca_uuid` varchar(255) not null;');
    this.addSql('alter table `encargado_finca` add index `encargado_finca_finca_uuid_index`(`finca_uuid`);');
    this.addSql('alter table `encargado_finca` add unique `encargado_finca_finca_uuid_unique`(`finca_uuid`);');

    this.addSql('alter table `encargado_finca` add constraint `encargado_finca_finca_uuid_foreign` foreign key (`finca_uuid`) references `finca` (`uuid`) on update cascade;');
  }

}
