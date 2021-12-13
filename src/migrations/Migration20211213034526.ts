import { Migration } from '@mikro-orm/migrations';

export class Migration20211213034526 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `finca_variedades` (`finca_uuid` varchar(255) not null, `variedad_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `finca_variedades` add index `finca_variedades_finca_uuid_index`(`finca_uuid`);');
    this.addSql('alter table `finca_variedades` add index `finca_variedades_variedad_uuid_index`(`variedad_uuid`);');
    this.addSql('alter table `finca_variedades` add primary key `finca_variedades_pkey`(`finca_uuid`, `variedad_uuid`);');

    this.addSql('alter table `finca_variedades` add constraint `finca_variedades_finca_uuid_foreign` foreign key (`finca_uuid`) references `finca` (`uuid`) on update cascade on delete cascade;');
    this.addSql('alter table `finca_variedades` add constraint `finca_variedades_variedad_uuid_foreign` foreign key (`variedad_uuid`) references `variedad` (`uuid`) on update cascade on delete cascade;');

    this.addSql('drop table if exists `finca_variedades_finca`;');
  }

}
