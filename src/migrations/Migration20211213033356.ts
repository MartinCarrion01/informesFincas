import { Migration } from '@mikro-orm/migrations';

export class Migration20211213033356 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `productor` (`uuid` varchar(255) not null, `cod_productor` int(11) not null, `nombre_productor` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `productor` add primary key `productor_pkey`(`uuid`);');
    this.addSql('alter table `productor` add unique `productor_cod_productor_unique`(`cod_productor`);');

    this.addSql('alter table `finca` add `productor_uuid` varchar(255) not null;');
    this.addSql('alter table `finca` add index `finca_productor_uuid_index`(`productor_uuid`);');

    this.addSql('alter table `finca` add constraint `finca_productor_uuid_foreign` foreign key (`productor_uuid`) references `productor` (`uuid`) on update cascade;');
  }

}
