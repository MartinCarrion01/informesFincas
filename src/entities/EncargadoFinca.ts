import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { Finca } from "./Finca";

@Entity()
export class EncargadoFinca extends Base {
  @Property({ unique: true })
  codEncargadoFinca: number;

  @Property()
  nombreEncargadoFinca: String;

  @Property()
  numeroEncargadoFinca: String;

  @Property({ default: true })
  active: Boolean;

  @OneToOne(() => Finca, (finca) => finca.encargadoFinca)
  finca!: Finca;
}
