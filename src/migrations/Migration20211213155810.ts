import { Migration } from '@mikro-orm/migrations';

export class Migration20211213155810 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `informe` add `usuario_recorredor_uuid` varchar(255) not null, add `active` tinyint(1) not null default true;');
    this.addSql('alter table `informe` add index `informe_usuario_recorredor_uuid_index`(`usuario_recorredor_uuid`);');

    this.addSql('create table `informe_comentario_edicion` (`uuid` varchar(255) not null, `fecha_edicion` datetime not null, `descripcion_previa` varchar(300) not null, `descripcion_nueva` varchar(300) not null, `informe_comentario_uuid` varchar(255) not null, `usuario_editor_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `informe_comentario_edicion` add primary key `informe_comentario_edicion_pkey`(`uuid`);');
    this.addSql('alter table `informe_comentario_edicion` add index `informe_comentario_edicion_informe_comentario_uuid_index`(`informe_comentario_uuid`);');
    this.addSql('alter table `informe_comentario_edicion` add index `informe_comentario_edicion_usuario_editor_uuid_index`(`usuario_editor_uuid`);');

    this.addSql('alter table `informe` add constraint `informe_usuario_recorredor_uuid_foreign` foreign key (`usuario_recorredor_uuid`) references `user` (`uuid`) on update cascade;');

    this.addSql('alter table `informe_comentario_edicion` add constraint `informe_comentario_edicion_informe_comentario_uuid_foreign` foreign key (`informe_comentario_uuid`) references `informe_comentario` (`uuid`) on update cascade;');
    this.addSql('alter table `informe_comentario_edicion` add constraint `informe_comentario_edicion_usuario_editor_uuid_foreign` foreign key (`usuario_editor_uuid`) references `user` (`uuid`) on update cascade;');
  }

}
