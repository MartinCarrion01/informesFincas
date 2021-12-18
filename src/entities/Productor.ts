import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Finca } from "./Finca";

@Entity()
export class Productor extends Base {
  @Column({ unique: true })
  codProductor: number;

  @Column({ unique: true })
  nombreProductor: String;

  @OneToMany(() => Finca, (finca) => finca.productor)
  fincas: Finca[];
}
