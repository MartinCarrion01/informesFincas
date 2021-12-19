import { Column, Entity, OneToOne } from "typeorm";
import { Base } from "./Base";
import { Finca } from "./Finca";

@Entity()
export class EncargadoFinca extends Base {
  @Column({ unique: true })
  codEncargadoFinca: number;

  @Column()
  nombreEncargadoFinca: String;

  @Column({unique: true})
  numeroEncargadoFinca: String;

  @OneToOne(() => Finca, (finca) => finca.encargadoFinca)
  finca!: Finca;
}
