import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { Finca } from "./Finca";

@Entity()
export class Productor extends Base {
  @Property({ unique: true })
  codProductor: number;

  @Property()
  nombreProductor: String;

  @Property({ default: true })
  active: Boolean;

  @OneToMany({
    entity: () => Finca,
    mappedBy: "productor",
    orphanRemoval: true,
  })
  fincas = new Collection<Finca>(this);
}
