import { Column, Entity, OneToOne } from "typeorm";
import { Base } from "./Base";
import { Finca } from "./Finca";

@Entity()
export class EncargadoFinca extends Base {
  @Column()
  nombreEncargadoFinca: String;

  @Column()
  numeroEncargadoFinca: String;

  @OneToOne(() => Finca, (finca) => finca.encargadoFinca)
  finca!: Finca;
}
