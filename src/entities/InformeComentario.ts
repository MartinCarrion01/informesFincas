import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { Informe } from "./Informe";
import { InformeComentarioEdicion } from "./InformeComentarioEdicion";

@Entity()
export class InformeComentario extends Base {
  @Property({ type: "date" })
  fechaIngresoInforme = new Date();

  @Property({ length: 300 })
  descripcion: String;

  @ManyToOne(() => Informe)
  informe: Informe;

  @OneToMany({
    entity: () => InformeComentarioEdicion,
    mappedBy: "informeComentario",
    orphanRemoval: true,
  })
  informeComentarioEdiciones = new Collection<InformeComentarioEdicion>(this);
}
