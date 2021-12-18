import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Finca } from "./Finca";
import { Informe } from "./Informe";

@Entity()
export class Variedad extends Base {
  @Column({ unique: true })
  codVariedad: number;

  @Column({ unique: true })
  nombreVariedad: String;

  @OneToMany(() => Informe, (informe) => informe.variedad)
  informes: Informe[];

  @ManyToMany(() => Finca, (finca) => finca.variedades)
  fincas: Finca[];
}
