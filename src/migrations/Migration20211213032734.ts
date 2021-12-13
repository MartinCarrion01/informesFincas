import { Migration } from '@mikro-orm/migrations';

export class Migration20211213032734 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `encargado_finca` (`uuid` varchar(255) not null, `cod_encargado_finca` int(11) not null, `nombre_encargado_finca` varchar(255) not null, `numero_encargado_finca` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `encargado_finca` add primary key `encargado_finca_pkey`(`uuid`);');
    this.addSql('alter table `encargado_finca` add unique `encargado_finca_cod_encargado_finca_unique`(`cod_encargado_finca`);');

    this.addSql('create table `finca` (`uuid` varchar(255) not null, `cod_finca` int(11) not null, `nombre_finca` varchar(255) not null, `coordenadas_finca` varchar(255) not null, `encargado_finca_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `finca` add primary key `finca_pkey`(`uuid`);');
    this.addSql('alter table `finca` add unique `finca_cod_finca_unique`(`cod_finca`);');
    this.addSql('alter table `finca` add index `finca_encargado_finca_uuid_index`(`encargado_finca_uuid`);');
    this.addSql('alter table `finca` add unique `finca_encargado_finca_uuid_unique`(`encargado_finca_uuid`);');

    this.addSql('create table `informe` (`uuid` varchar(255) not null, `cod_informe` int(11) not null, `fecha_ingreso_informe` datetime not null, `cant_kg_estimado_cosecha` int(11) not null, `fecha_estimada_cosecha` datetime not null, `cant_kg_real_cosecha` int(11) null, `fecha_real_cosecha` datetime null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `informe` add primary key `informe_pkey`(`uuid`);');
    this.addSql('alter table `informe` add unique `informe_cod_informe_unique`(`cod_informe`);');

    this.addSql('create table `informe_comentario` (`uuid` varchar(255) not null, `fecha_ingreso_informe` datetime not null, `descripcion` varchar(300) not null, `informe_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `informe_comentario` add primary key `informe_comentario_pkey`(`uuid`);');
    this.addSql('alter table `informe_comentario` add index `informe_comentario_informe_uuid_index`(`informe_uuid`);');

    this.addSql('alter table `finca` add constraint `finca_encargado_finca_uuid_foreign` foreign key (`encargado_finca_uuid`) references `encargado_finca` (`uuid`) on update cascade;');

    this.addSql('alter table `informe_comentario` add constraint `informe_comentario_informe_uuid_foreign` foreign key (`informe_uuid`) references `informe` (`uuid`) on update cascade;');
  }

}
