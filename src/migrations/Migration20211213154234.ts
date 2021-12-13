import { Migration } from '@mikro-orm/migrations';

export class Migration20211213154234 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user_role` (`uuid` varchar(255) not null, `nombre_user_role` varchar(255) not null, `active` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user_role` add primary key `user_role_pkey`(`uuid`);');

    this.addSql('alter table `user` add `rol_uuid` varchar(255) not null;');
    this.addSql('alter table `user` add index `user_rol_uuid_index`(`rol_uuid`);');

    this.addSql('alter table `user` add constraint `user_rol_uuid_foreign` foreign key (`rol_uuid`) references `user_role` (`uuid`) on update cascade;');
  }

}
