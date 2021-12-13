import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { Informe } from "./Informe";

@Entity()
export class Variedad extends Base {
  @Property({ unique: true })
  codVariedad: number;

  @Property()
  nombreVariedad: String;

  @Property({ default: true })
  active: Boolean;

  @OneToMany({
    entity: () => Informe,
    mappedBy: "variedad",
    orphanRemoval: true,
  })
  informes = new Collection<Informe>(this);
}
