import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Finca } from "./Finca";
import { InformeComentario } from "./InformeComentario";
import { User } from "./User";
import { Variedad } from "./Variedad";

@Entity()
export class Informe extends Base {
  @Column({ unique: true })
  codInforme: number;

  @Column({ type: "date" })
  fechaIngresoInforme = new Date();

  @Column()
  cantKgEstimadoCosecha: number;

  @Column({ type: "date" })
  fechaEstimadaCosecha: Date;

  @Column({ nullable: true })
  cantKgRealCosecha: number;

  @Column({ type: "date", nullable: true })
  fechaRealCosecha: Date;

  @OneToMany(
    () => InformeComentario,
    (informeComentario) => informeComentario.informe
  )
  informeComentarios: InformeComentario[];

  @ManyToOne(() => Finca, (finca) => finca.informes)
  finca: Finca;

  @ManyToOne(() => Variedad, (variedad) => variedad.fincas)
  variedad: Variedad;

  @ManyToOne(() => User, (user) => user.informes)
  usuarioRecorredor: User;

  @Column({ default: true })
  active: boolean;
}
