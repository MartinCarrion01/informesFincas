import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { Informe } from "./Informe";

@Entity()
export class InformeComentario extends Base {
  @Property({ type: "date" })
  fechaIngresoInforme = new Date();

  @Property({ length: 300 })
  descripcion: String;

  @ManyToOne(() => Informe)
  informe: Informe;
}
