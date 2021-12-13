import { Migration } from '@mikro-orm/migrations';

export class Migration20211213034344 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `variedad` (`uuid` varchar(255) not null, `cod_variedad` int(11) not null, `nombre_variedad` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `variedad` add primary key `variedad_pkey`(`uuid`);');
    this.addSql('alter table `variedad` add unique `variedad_cod_variedad_unique`(`cod_variedad`);');

    this.addSql('create table `finca_variedades_finca` (`finca_uuid` varchar(255) not null, `variedad_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `finca_variedades_finca` add index `finca_variedades_finca_finca_uuid_index`(`finca_uuid`);');
    this.addSql('alter table `finca_variedades_finca` add index `finca_variedades_finca_variedad_uuid_index`(`variedad_uuid`);');
    this.addSql('alter table `finca_variedades_finca` add primary key `finca_variedades_finca_pkey`(`finca_uuid`, `variedad_uuid`);');

    this.addSql('alter table `finca_variedades_finca` add constraint `finca_variedades_finca_finca_uuid_foreign` foreign key (`finca_uuid`) references `finca` (`uuid`) on update cascade on delete cascade;');
    this.addSql('alter table `finca_variedades_finca` add constraint `finca_variedades_finca_variedad_uuid_foreign` foreign key (`variedad_uuid`) references `variedad` (`uuid`) on update cascade on delete cascade;');
  }

}
