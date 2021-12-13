import { Migration } from '@mikro-orm/migrations';

export class Migration20211213034845 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `informe` add `finca_uuid` varchar(255) not null;');
    this.addSql('alter table `informe` add index `informe_finca_uuid_index`(`finca_uuid`);');

    this.addSql('alter table `informe` add constraint `informe_finca_uuid_foreign` foreign key (`finca_uuid`) references `finca` (`uuid`) on update cascade;');
  }

}
