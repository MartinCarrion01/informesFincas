import { Migration } from '@mikro-orm/migrations';

export class Migration20211213153216 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `variedad` (`uuid` varchar(255) not null, `cod_variedad` int(11) not null, `nombre_variedad` varchar(255) not null, `active` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `variedad` add primary key `variedad_pkey`(`uuid`);');
    this.addSql('alter table `variedad` add unique `variedad_cod_variedad_unique`(`cod_variedad`);');

    this.addSql('create table `productor` (`uuid` varchar(255) not null, `cod_productor` int(11) not null, `nombre_productor` varchar(255) not null, `active` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `productor` add primary key `productor_pkey`(`uuid`);');
    this.addSql('alter table `productor` add unique `productor_cod_productor_unique`(`cod_productor`);');

    this.addSql('create table `encargado_finca` (`uuid` varchar(255) not null, `cod_encargado_finca` int(11) not null, `nombre_encargado_finca` varchar(255) not null, `numero_encargado_finca` varchar(255) not null, `active` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `encargado_finca` add primary key `encargado_finca_pkey`(`uuid`);');
    this.addSql('alter table `encargado_finca` add unique `encargado_finca_cod_encargado_finca_unique`(`cod_encargado_finca`);');

    this.addSql('create table `finca` (`uuid` varchar(255) not null, `cod_finca` int(11) not null, `nombre_finca` varchar(255) not null, `coordenadas_finca` varchar(255) not null, `active` tinyint(1) not null default true, `encargado_finca_uuid` varchar(255) not null, `productor_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `finca` add primary key `finca_pkey`(`uuid`);');
    this.addSql('alter table `finca` add unique `finca_cod_finca_unique`(`cod_finca`);');
    this.addSql('alter table `finca` add index `finca_encargado_finca_uuid_index`(`encargado_finca_uuid`);');
    this.addSql('alter table `finca` add unique `finca_encargado_finca_uuid_unique`(`encargado_finca_uuid`);');
    this.addSql('alter table `finca` add index `finca_productor_uuid_index`(`productor_uuid`);');

    this.addSql('create table `finca_variedades` (`finca_uuid` varchar(255) not null, `variedad_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `finca_variedades` add index `finca_variedades_finca_uuid_index`(`finca_uuid`);');
    this.addSql('alter table `finca_variedades` add index `finca_variedades_variedad_uuid_index`(`variedad_uuid`);');
    this.addSql('alter table `finca_variedades` add primary key `finca_variedades_pkey`(`finca_uuid`, `variedad_uuid`);');

    this.addSql('create table `informe` (`uuid` varchar(255) not null, `cod_informe` int(11) not null, `fecha_ingreso_informe` datetime not null, `cant_kg_estimado_cosecha` int(11) not null, `fecha_estimada_cosecha` datetime not null, `cant_kg_real_cosecha` int(11) null, `fecha_real_cosecha` datetime null, `finca_uuid` varchar(255) not null, `variedad_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `informe` add primary key `informe_pkey`(`uuid`);');
    this.addSql('alter table `informe` add unique `informe_cod_informe_unique`(`cod_informe`);');
    this.addSql('alter table `informe` add index `informe_finca_uuid_index`(`finca_uuid`);');
    this.addSql('alter table `informe` add index `informe_variedad_uuid_index`(`variedad_uuid`);');

    this.addSql('create table `informe_comentario` (`uuid` varchar(255) not null, `fecha_ingreso_informe` datetime not null, `descripcion` varchar(300) not null, `informe_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `informe_comentario` add primary key `informe_comentario_pkey`(`uuid`);');
    this.addSql('alter table `informe_comentario` add index `informe_comentario_informe_uuid_index`(`informe_uuid`);');

    this.addSql('alter table `finca` add constraint `finca_encargado_finca_uuid_foreign` foreign key (`encargado_finca_uuid`) references `encargado_finca` (`uuid`) on update cascade;');
    this.addSql('alter table `finca` add constraint `finca_productor_uuid_foreign` foreign key (`productor_uuid`) references `productor` (`uuid`) on update cascade;');

    this.addSql('alter table `finca_variedades` add constraint `finca_variedades_finca_uuid_foreign` foreign key (`finca_uuid`) references `finca` (`uuid`) on update cascade on delete cascade;');
    this.addSql('alter table `finca_variedades` add constraint `finca_variedades_variedad_uuid_foreign` foreign key (`variedad_uuid`) references `variedad` (`uuid`) on update cascade on delete cascade;');

    this.addSql('alter table `informe` add constraint `informe_finca_uuid_foreign` foreign key (`finca_uuid`) references `finca` (`uuid`) on update cascade;');
    this.addSql('alter table `informe` add constraint `informe_variedad_uuid_foreign` foreign key (`variedad_uuid`) references `variedad` (`uuid`) on update cascade;');

    this.addSql('alter table `informe_comentario` add constraint `informe_comentario_informe_uuid_foreign` foreign key (`informe_uuid`) references `informe` (`uuid`) on update cascade;');
  }

}
