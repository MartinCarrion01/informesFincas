import {
  Entity,
  Property,
  OneToOne,
  ManyToOne,
  Collection,
  ManyToMany,
  OneToMany,
} from "@mikro-orm/core";
import { Base } from "./Base";
import { EncargadoFinca } from "./EncargadoFinca";
import { Informe } from "./Informe";
import { Productor } from "./Productor";
import { Variedad } from "./Variedad";

@Entity()
export class Finca extends Base {
  @Property({ unique: true })
  codFinca: number;

  @Property()
  nombreFinca: String;

  @Property()
  coordenadasFinca: String;

  @Property({ default: true })
  active: Boolean;

  @OneToOne({ inversedBy: "finca" })
  encargadoFinca: EncargadoFinca;

  @ManyToOne(() => Productor)
  productor: Productor;

  @ManyToMany(() => Variedad)
  variedades: Collection<Variedad> = new Collection<Variedad>(this);

  @OneToMany({
    entity: () => Informe,
    mappedBy: "finca",
    orphanRemoval: true,
  })
  informes = new Collection<Informe>(this);
}
