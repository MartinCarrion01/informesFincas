import { Migration } from '@mikro-orm/migrations';

export class Migration20211213153650 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`uuid` varchar(255) not null, `dni_usuario` int(11) not null, `nombre_usuario` varchar(255) not null, `apellido_usuario` varchar(255) not null, `legajo_usuario` varchar(255) not null, `fecha_alta_usuario` datetime not null, `active` tinyint(1) not null default true, `password` text not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add primary key `user_pkey`(`uuid`);');
    this.addSql('alter table `user` add unique `user_dni_usuario_unique`(`dni_usuario`);');
    this.addSql('alter table `user` add unique `user_legajo_usuario_unique`(`legajo_usuario`);');
  }

}
