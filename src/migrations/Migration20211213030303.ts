import { Migration } from '@mikro-orm/migrations';

export class Migration20211213030303 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `informe_comentario` modify `informe_uuid` varchar(255);');
    this.addSql('alter table `informe_comentario` drop index `informe_comentario_informe_uuid_index`;');
    this.addSql('alter table `informe_comentario` add index `informe_comentario_informe_uuid_index`(`informe_uuid`);');

    this.addSql('alter table `informe` add unique `informe_cod_informe_unique`(`cod_informe`);');

    this.addSql('alter table `informe_comentario` drop index `informe_comentario_informe_uuid_informe_cod_informe_index`;');
  }

}
