import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { InformeComentario } from "./InformeComentario";
import { User } from "./User";

@Entity()
export class InformeComentarioEdicion extends Base {
  @Property({ type: "date" })
  fechaEdicion = new Date();

  @Property({ length: 300 })
  descripcionPrevia: String;

  @Property({ length: 300 })
  descripcionNueva: String;

  @ManyToOne(() => InformeComentario)
  informeComentario: InformeComentario;

  @ManyToOne(() => User)
  usuarioEditor: User;
}
