import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Informe } from "./Informe";
import { InformeComentarioEdicion } from "./InformeComentarioEdicion";

@Entity()
export class InformeComentario extends Base {
  @Column({ length: 300 })
  descripcion: String;

  @ManyToOne(() => Informe, (informe) => informe.informeComentarios)
  informe: Informe;

  @OneToMany(
    () => InformeComentarioEdicion,
    (informeComentarioEdicion) => informeComentarioEdicion.informeComentario,
    { cascade: true }
  )
  informeComentarioEdiciones: InformeComentarioEdicion[];
}
