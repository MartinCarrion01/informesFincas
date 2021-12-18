import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { Informe } from "./Informe";

@Entity()
export class InformeCosechaEstimada extends Base {
  @Column()
  cantKgEstimadoCosecha: number;

  @Column({ type: "date" })
  fechaEstimadaCosecha: Date;

  @ManyToOne(() => Informe, (informe) => informe.informeCosechasEstimadas)
  informe: Informe;
}
