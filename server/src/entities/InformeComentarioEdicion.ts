import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { InformeComentario } from "./InformeComentario";
import { User } from "./User";

@Entity()
export class InformeComentarioEdicion extends Base {

  @Column({ length: 300 })
  descripcionPrevia: String;

  @Column({ length: 300 })
  descripcionNueva: String;

  @ManyToOne(
    () => InformeComentario,
    (informeComentario) => informeComentario.informeComentarioEdiciones
  )
  informeComentario: InformeComentario;

  @ManyToOne(() => User, (user) => user.informeComentarioEdiciones)
  usuarioEditor: User;
}
