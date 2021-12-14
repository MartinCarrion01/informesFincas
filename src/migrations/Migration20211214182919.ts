import { Migration } from '@mikro-orm/migrations';

export class Migration20211214182919 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `variedad` add unique `variedad_nombre_variedad_unique`(`nombre_variedad`);');
  }

}
