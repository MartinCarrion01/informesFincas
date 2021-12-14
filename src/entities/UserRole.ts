import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { Base } from "./Base";
import { User } from "./User";

@Entity()
export class UserRole extends Base {
  @Property()
  nombreUserRole: String;

  @Property({ default: true })
  active: boolean;

  @OneToMany({
    entity: () => User,
    mappedBy: "rol",
    orphanRemoval: true,
  })
  usersByRole = new Collection<User>(this);
}
