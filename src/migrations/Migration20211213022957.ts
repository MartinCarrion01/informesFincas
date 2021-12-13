import { Migration } from '@mikro-orm/migrations';

export class Migration20211213022957 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `informe_comentario` (`uuid` varchar(255) not null, `fecha_ingreso_informe` datetime not null, `descripcion` varchar(300) not null, `informe_uuid` varchar(255) not null, `informe_cod_informe` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `informe_comentario` add primary key `informe_comentario_pkey`(`uuid`);');

    this.addSql('alter table `informe_comentario` add constraint `informe_comentario_informe_uuid_informe_cod_informe_foreign` foreign key (`informe_uuid`, `informe_cod_informe`) references `informe` (`uuid`, `cod_informe`) on update cascade;');

    this.addSql('alter table `informe_comentario` add index `informe_comentario_informe_uuid_informe_cod_informe_index`(`informe_uuid`, `informe_cod_informe`);');
  }

}
