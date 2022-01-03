import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Finca } from "./Finca";
import { InformeComentario } from "./InformeComentario";
import { InformeCosechaEstimada } from "./InformeCosechaEstimada";
import { User } from "./User";
import { Variedad } from "./Variedad";

@Entity()
export class Informe extends Base {
  
  @Column()
  codInforme: number;

  @Column()
  informeTitulo: string;

  @Column({ nullable: true })
  cantKgRealCosecha: number;

  @Column({ type: "date", nullable: true })
  fechaRealCosecha: Date;

  @OneToMany(
    () => InformeComentario,
    (informeComentario) => informeComentario.informe,
    { cascade: true }
  )
  informeComentarios: InformeComentario[];

  @ManyToOne(() => Finca, (finca) => finca.informes)
  finca: Finca;

  @ManyToOne(() => Variedad, (variedad) => variedad.fincas)
  variedad: Variedad;

  @ManyToOne(() => User, (user) => user.informes)
  usuarioRecorredor: User;

  @OneToMany(
    () => InformeCosechaEstimada,
    (informeCosechaEstimada) => informeCosechaEstimada.informe,
    { cascade: true }
  )
  informeCosechasEstimadas: InformeCosechaEstimada[];
}
