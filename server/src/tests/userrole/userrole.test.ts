import { Express } from "express-serve-static-core";
import { UserRole } from "../../entities/UserRole";
import supertest, { SuperTest } from "supertest";
import { createServer } from "../../utils/server";
import { UserRoleTestHelper } from "./userRoleTestHelper";
import { getManager } from "typeorm";

let app: Express;
let userRoleTestHelper: UserRoleTestHelper;
let api: SuperTest<supertest.Test>;

beforeAll(async () => {
  try {
    app = await createServer();
    api = supertest(app);
    userRoleTestHelper = new UserRoleTestHelper(getManager());
  } catch (error) {
    console.log(error);
  }
}, 3000000);

beforeEach(async () => {
  await userRoleTestHelper.em.delete(UserRole, {});
  userRoleTestHelper.initUserRoles();
  await userRoleTestHelper.em.save(
    userRoleTestHelper.UserRolesIniciales
  );
});

describe("recuperar todas los UserRoles", () => {
  test("si no hay nada, se devuelve un 404", async () => {
    await userRoleTestHelper.em.delete(UserRole, {});
    const res = await api.get("/admin/userrole").expect(404);
    expect(res.body).toStrictEqual({
      mensaje: "no se encontraron roles de usuario",
    });
  });
  test("devuelve roles", async () => {
    const res = await supertest(app)
      .get("/admin/userrole")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(res.body).toHaveLength(userRoleTestHelper.UserRolesIniciales.length);
  });
});

describe("un UserRole es creado", () => {
  test("si no hay nombre, falla", async () => {
    const userRole = userRoleTestHelper.em.create(UserRole, {});
    await api.post("/admin/userrole").send(userRole).expect(400);
    const userRoles = await userRoleTestHelper.userRoleAtDb();
    expect(userRoles).toHaveLength(
      userRoleTestHelper.UserRolesIniciales.length
    );
  });
  test("una UserRole se crea correctamente", async () => {
    const userRole = userRoleTestHelper.em.create(UserRole, {
      nombreUserRole: "rol4",
    });
    await api.post("/admin/userrole").send(userRole).expect(201);
    const userRoles = await userRoleTestHelper.userRoleAtDb();
    expect(userRoles).toHaveLength(
      userRoleTestHelper.UserRolesIniciales.length + 1
    );
    const nombres = userRoles.map((userRole) => userRole.nombreUserRole);
    expect(nombres).toContain("rol4");
  });
});

describe("una UserRole es actualizada", () => {
  test("no se actualiza una UserRole sin nombre", async () => {
    const userRoles = await userRoleTestHelper.userRoleAtDb();
    const userRole = userRoles[0];
    const { nombreUserRole, ...updatedUserRole } = userRole;
    await api
      .put(`/admin/userrole/${userRole.uuid}`)
      .send(updatedUserRole)
      .expect(400);
  });
  test("no se actualiza una UserRole no vigente", async () => {
    await userRoleTestHelper.expiredUserRole();
    const userRoles = await userRoleTestHelper.userRoleAtDb();
    const userRole = userRoles.find(userRole => userRole.nombreUserRole === "rol1")
    const updatedUserRole = {
      ...userRole,
      nombreUserRole: "rol1new",
    };
    await api
      .put(`/admin/userrole/${userRole!.uuid}`)
      .send(updatedUserRole)
      .expect(403);
    expect(updatedUserRole).not.toStrictEqual(userRole);
  });
  test("se actualiza una UserRole correctamente", async () => {
    const userRoles = await userRoleTestHelper.userRoleAtDb();
    const userRole = userRoles.find(userRole => userRole.nombreUserRole === "rol1")
    const updatedUserRole = {
      ...userRole,
      nombreUserRole: "rol1new",
    };
    await api
      .put(`/admin/userrole/${userRole!.uuid}`)
      .send(updatedUserRole)
      .expect(200);

    const userRolesAfter = await userRoleTestHelper.em.find(UserRole, {});

    expect(userRolesAfter).toHaveLength(
      userRoleTestHelper.UserRolesIniciales.length
    );
  });
});

describe("una UserRole es dada de baja", () => {
  test("una UserRole no vigente no se vuelve a dar de baja", async () => {
    await userRoleTestHelper.expiredUserRole();
    const userRoles = await userRoleTestHelper.userRoleAtDb();
    const userRole = userRoles.find(userRole => userRole.nombreUserRole === "rol1")
    await api
      .delete(`/admin/userrole/${userRole!.uuid}`)
      .send(userRole)
      .expect(403);
  });
  test("una UserRole es dada de baja", async () => {
    const userRoles = await userRoleTestHelper.userRoleAtDb();
    const userRole = userRoles.find(userRole => userRole.nombreUserRole === "rol1")
    await api
      .delete(`/admin/userrole/${userRole!.uuid}`)
      .send(userRole)
      .expect(204);
  });
});
