import { Express } from "express-serve-static-core";
import { EncargadoFinca } from "../../entities/EncargadoFinca";
import supertest, { SuperTest } from "supertest";
import { createServer } from "../../utils/server";
import { EncargadoFincaTestHelper } from "./encargadoFincaTestHelper";
import { getManager } from "typeorm";

let app: Express;
let encargadoFincaTestHelper: EncargadoFincaTestHelper;
let api: SuperTest<supertest.Test>;

beforeAll(async () => {
  try {
    app = await createServer();
    api = supertest(app);
    encargadoFincaTestHelper = new EncargadoFincaTestHelper(getManager());
  } catch (error) {
    console.log(error);
  }
}, 3000000);

beforeEach(async () => {
  await encargadoFincaTestHelper.em.delete(EncargadoFinca, {});
  encargadoFincaTestHelper.initEncargadosFinca();
  await encargadoFincaTestHelper.em.save(
    encargadoFincaTestHelper.encargadosFincaIniciales
  );
});

describe("recuperar todas las encargadosFinca", () => {
  test("si no hay nada, se devuelve un 404", async () => {
    await encargadoFincaTestHelper.em.delete(EncargadoFinca, {});
    const res = await api.get("/admin/encargadofinca").expect(404);
    expect(res.body).toStrictEqual({
      mensaje: "no se encontraron encargados de finca",
    });
  });
  test("devuelve notas", async () => {
    const res = await supertest(app)
      .get("/admin/encargadofinca")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(res.body).toHaveLength(
      encargadoFincaTestHelper.encargadosFincaIniciales.length
    );
  });
});

describe("una encargadoFinca es creada", () => {
  test("si no hay nombre, falla", async () => {
    const encargadoFinca = encargadoFincaTestHelper.em.create(EncargadoFinca, {
      numeroEncargadoFinca: "264",
    });
    await api.post("/admin/encargadofinca").send(encargadoFinca).expect(400);
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    expect(encargadosFinca).toHaveLength(
      encargadoFincaTestHelper.encargadosFincaIniciales.length
    );
  });

  test("si no hay numero, falla", async () => {
    const encargadoFinca = encargadoFincaTestHelper.em.create(EncargadoFinca, {
      nombreEncargadoFinca: "enc4",
    });
    await api.post("/admin/encargadofinca").send(encargadoFinca).expect(400);
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    expect(encargadosFinca).toHaveLength(
      encargadoFincaTestHelper.encargadosFincaIniciales.length
    );
  });

  test("si no hay numero ni nombre, falla", async () => {
    const encargadoFinca = encargadoFincaTestHelper.em.create(
      EncargadoFinca,
      {}
    );
    await api.post("/admin/encargadofinca").send(encargadoFinca).expect(400);
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    expect(encargadosFinca).toHaveLength(
      encargadoFincaTestHelper.encargadosFincaIniciales.length
    );
  });

  test("si ya existe una var con ese numero, falla", async () => {
    const encargadoFinca = encargadoFincaTestHelper.em.create(EncargadoFinca, {
      nombreEncargadoFinca: "prod4",
      numeroEncargadoFinca: "261",
      codEncargadoFinca: 4,
    });
    await api.post("/admin/encargadofinca").send(encargadoFinca).expect(400);
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    expect(encargadosFinca).toHaveLength(
      encargadoFincaTestHelper.encargadosFincaIniciales.length
    );
  });
  test("una encargadoFinca se crea correctamente", async () => {
    const encargadoFinca = encargadoFincaTestHelper.em.create(EncargadoFinca, {
      nombreEncargadoFinca: "prod4",
      numeroEncargadoFinca: "264",
      codEncargadoFinca: 4,
    });
    await api.post("/admin/encargadofinca").send(encargadoFinca).expect(201);
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    expect(encargadosFinca).toHaveLength(
      encargadoFincaTestHelper.encargadosFincaIniciales.length + 1
    );
    const nombres = encargadosFinca.map(
      (encargadoFinca) => encargadoFinca.nombreEncargadoFinca
    );
    expect(nombres).toContain("prod4");
  });
});

describe("una encargadoFinca es actualizada", () => {
  test("no se actualiza una encargadoFinca sin nombre", async () => {
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca[0];
    const { nombreEncargadoFinca, ...updatedEncargadoFinca } = encargadoFinca;
    await api
      .put(`/admin/encargadofinca/${encargadoFinca.uuid}`)
      .send(updatedEncargadoFinca)
      .expect(400);
  });
  test("no se actualiza una encargadoFinca sin numero", async () => {
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca[0];
    const { numeroEncargadoFinca, ...updatedEncargadoFinca } = encargadoFinca;
    await api
      .put(`/admin/encargadofinca/${encargadoFinca.uuid}`)
      .send(updatedEncargadoFinca)
      .expect(400);
  });
  test("no se actualiza una encargadoFinca sin numero ni nombre", async () => {
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca[0];
    const {
      numeroEncargadoFinca,
      nombreEncargadoFinca,
      ...updatedEncargadoFinca
    } = encargadoFinca;
    await api
      .put(`/admin/encargadofinca/${encargadoFinca.uuid}`)
      .send(updatedEncargadoFinca)
      .expect(400);
  });
  test("no se actualiza una encargadoFinca no vigente", async () => {
    await encargadoFincaTestHelper.expiredEncargadoFinca();
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca.find(
      (encargadoFinca) => encargadoFinca.codEncargadoFinca === 3
    );
    const updatedEncargadoFinca = {
      ...EncargadoFinca,
      nombreEncargadoFinca: "enc4new",
      numeroEncargadoFinca: "264",
    };
    await api
      .put(`/admin/encargadofinca/${encargadoFinca!.uuid}`)
      .send(updatedEncargadoFinca)
      .expect(403);
    expect(updatedEncargadoFinca).not.toStrictEqual(encargadoFinca);
  });
  test("no se actualiza una encargadoFinca si el numero ya existe", async () => {
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca.find(
      (encargadoFinca) => encargadoFinca.codEncargadoFinca === 3
    );
    const updatedEncargadoFinca = {
      ...EncargadoFinca,
      nombreEncargadoFinca: "prod4new",
      numeroEncargadoFinca: "261",
    };
    await api
      .put(`/admin/encargadofinca/${encargadoFinca!.uuid}`)
      .send(updatedEncargadoFinca)
      .expect(400);
    expect(updatedEncargadoFinca).not.toStrictEqual(encargadoFinca);
  });
  test("se actualiza una encargadoFinca correctamente", async () => {
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca.find(
      (encargadoFinca) => encargadoFinca.codEncargadoFinca === 3
    );
    const updatedEncargadoFinca = {
      ...EncargadoFinca,
      nombreEncargadoFinca: "prod4new",
      numeroEncargadoFinca: "267",
    };
    await api
      .put(`/admin/encargadofinca/${encargadoFinca!.uuid}`)
      .send(updatedEncargadoFinca)
      .expect(200);

    const encargadosFincaAfter = await encargadoFincaTestHelper.em.find(
      EncargadoFinca,
      {}
    );

    expect(encargadosFincaAfter).toHaveLength(
      encargadoFincaTestHelper.encargadosFincaIniciales.length
    );
  });
});

describe("una encargadoFinca es dada de baja", () => {
  test("una encargadoFinca no vigente no se vuelve a dar de baja", async () => {
    await encargadoFincaTestHelper.expiredEncargadoFinca();
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca.find(
      (encargadoFinca) => encargadoFinca.codEncargadoFinca === 3
    );
    await api
      .delete(`/admin/encargadofinca/${encargadoFinca!.uuid}`)
      .send(encargadoFinca)
      .expect(403);
  });
  test("una encargadoFinca es dada de baja", async () => {
    const encargadosFinca = await encargadoFincaTestHelper.encargadoFincaAtDb();
    const encargadoFinca = encargadosFinca.find(
      (encargadoFinca) => encargadoFinca.codEncargadoFinca === 3
    );
    await api
      .delete(`/admin/encargadofinca/${encargadoFinca!.uuid}`)
      .send(encargadoFinca)
      .expect(204);
  });
});
