import { Migration } from '@mikro-orm/migrations';

export class Migration20211213030221 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `informe_comentario` drop foreign key `informe_comentario_informe_uuid_informe_cod_informe_foreign`;');
    this.addSql('alter table `informe_comentario` drop `informe_cod_informe`;');

    this.addSql('alter table `informe` add unique `informe_cod_informe_unique`(`cod_informe`);');
  }

}
