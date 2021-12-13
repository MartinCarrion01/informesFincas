import { Migration } from '@mikro-orm/migrations';

export class Migration20211213035225 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `informe` add `variedad_uuid` varchar(255) not null;');
    this.addSql('alter table `informe` add index `informe_variedad_uuid_index`(`variedad_uuid`);');

    this.addSql('alter table `informe` add constraint `informe_variedad_uuid_foreign` foreign key (`variedad_uuid`) references `variedad` (`uuid`) on update cascade;');
  }

}
