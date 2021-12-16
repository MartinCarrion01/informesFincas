import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Informe } from "./Informe";
import { InformeComentarioEdicion } from "./InformeComentarioEdicion";
import { UserRole } from "./UserRole";

@Entity()
export class User extends Base {
  @Column({ unique: true })
  dniUsuario: number;

  @Column()
  nombreUsuario: String;

  @Column()
  apellidoUsuario: String;

  @Column({ unique: true })
  legajoUsuario: String;

  @Column({ type: "date" })
  fechaAltaUsuario = new Date();

  @Column({ default: true })
  active: boolean;

  @Column({ type: "text" })
  password: string;

  @ManyToOne(() => UserRole, (userRole) => userRole.usersByRole)
  rol: UserRole;

  @OneToMany(
    () => InformeComentarioEdicion,
    (informeComentarioEdicion) => informeComentarioEdicion.informeComentario
  )
  informeComentarioEdiciones: InformeComentarioEdicion[];

  @OneToMany(() => Informe, informe => informe.usuarioRecorredor)
  informes: Informe[];
}
