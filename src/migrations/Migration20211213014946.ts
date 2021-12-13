import { Migration } from '@mikro-orm/migrations';

export class Migration20211213014946 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `informe` (`uuid` varchar(255) not null, `cod_informe` int(11) unsigned not null, `fecha_ingreso_informe` datetime not null, `cant_kg_estimado_cosecha` int(11) not null, `fecha_estimada_cosecha` datetime not null, `cant_kg_real_cosecha` int(11) null, `fecha_real_cosecha` datetime null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `informe` add primary key `informe_pkey`(`uuid`, `cod_informe`);');
  }

}
