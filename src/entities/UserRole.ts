import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";

@Entity()
export class UserRole extends Base {
  @Column()
  nombreUserRole: String;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => User, (user) => user.rol)
  usersByRole: User[];
}
