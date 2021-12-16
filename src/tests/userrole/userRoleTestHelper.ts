import { EntityManager } from "typeorm";
import { UserRole } from "../../entities/UserRole";

export class UserRoleTestHelper {
  em: EntityManager;
  UserRolesIniciales: UserRole[];
  constructor(em: EntityManager) {
    this.em = em;
  }
  initUserRoles() {
    this.UserRolesIniciales = [
      this.em.create(UserRole, { nombreUserRole: "rol1" }),
      this.em.create(UserRole, { nombreUserRole: "rol2" }),
      this.em.create(UserRole, { nombreUserRole: "rol3" }),
    ];
  }
  async expiredUserRole() {
    const userRole = await this.em.findOne(UserRole, {
      nombreUserRole: "rol1",
    });
    if (userRole) {
      userRole.active = false;
      await this.em.save(userRole);
    }
  }
  async userRoleAtDb() {
    return await this.em.find(UserRole, {});
  }
}
