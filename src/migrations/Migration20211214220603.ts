import { Migration } from '@mikro-orm/migrations';

export class Migration20211214220603 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `productor` add unique `productor_nombre_productor_unique`(`nombre_productor`);');
  }

}
