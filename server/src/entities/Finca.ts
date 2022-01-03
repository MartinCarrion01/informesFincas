import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Base } from "./Base";
import { EncargadoFinca } from "./EncargadoFinca";
import { Informe } from "./Informe";
import { Productor } from "./Productor";
import { Variedad } from "./Variedad";

@Entity()
export class Finca extends Base {
  @Column()
  nombreFinca: String;

  @Column()
  coordenadasFinca: String;

  @OneToOne(() => EncargadoFinca, (encargadoFinca) => encargadoFinca.finca, {
    nullable: true,
  })
  @JoinColumn()
  encargadoFinca: EncargadoFinca | null;

  @ManyToOne(() => Productor, (productor) => productor.fincas)
  productor: Productor;

  @ManyToMany(() => Variedad, (variedad) => variedad.fincas)
  @JoinTable()
  variedades: Variedad[];

  @OneToMany(() => Informe, (informe) => informe.finca)
  informes: Informe[];
}
