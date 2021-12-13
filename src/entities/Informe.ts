import {
  Entity,
  Property,
  OneToMany,
  Collection,
  ManyToOne,
} from "@mikro-orm/core";
import { Base } from "./Base";
import { Finca } from "./Finca";
import { InformeComentario } from "./InformeComentario";
import { User } from "./User";
import { Variedad } from "./Variedad";

@Entity()
export class Informe extends Base {
  @Property({ unique: true })
  codInforme: number;

  @Property({ type: "date" })
  fechaIngresoInforme = new Date();

  @Property()
  cantKgEstimadoCosecha: number;

  @Property({ type: "date" })
  fechaEstimadaCosecha: Date;

  @Property({ nullable: true })
  cantKgRealCosecha: number;

  @Property({ type: "date", nullable: true })
  fechaRealCosecha: Date;

  @OneToMany({
    entity: () => InformeComentario,
    mappedBy: "informe",
    orphanRemoval: true,
  })
  informeComentarios = new Collection<InformeComentario>(this);

  @ManyToOne(() => Finca)
  finca: Finca;

  @ManyToOne(() => Variedad)
  variedad: Variedad;

  @ManyToOne(() => User)
  usuarioRecorredor: User;

  @Property({ default: true })
  active: boolean;
}
