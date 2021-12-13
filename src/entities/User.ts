import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { Informe } from "./Informe";
import { InformeComentarioEdicion } from "./InformeComentarioEdicion";
import { UserRole } from "./UserRole";

@Entity()
export class User extends Base {
  @Property({ unique: true })
  dniUsuario: number;

  @Property()
  nombreUsuario: String;

  @Property()
  apellidoUsuario: String;

  @Property({ unique: true })
  legajoUsuario: String;

  @Property({ type: "date" })
  fechaAltaUsuario = new Date();

  @Property({ default: true })
  active: boolean;

  @Property({ type: "text" })
  password: string;

  @ManyToOne(() => UserRole)
  rol: UserRole;

  @OneToMany({
    entity: () => InformeComentarioEdicion,
    mappedBy: "usuarioEditor",
    orphanRemoval: true,
  })
  informeComentarioEdiciones = new Collection<InformeComentarioEdicion>(this);

  @OneToMany({
    entity: () => Informe,
    mappedBy: "usuarioRecorredor",
    orphanRemoval: true,
  })
  informes = new Collection<Informe>(this);
}
