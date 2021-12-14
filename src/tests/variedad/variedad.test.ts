import { Express } from "express-serve-static-core";
import { Variedad } from "../../entities/Variedad";
import supertest, { SuperTest } from "supertest";
import { createServer } from "../../utils/server";
import { connect } from "../commontesthelper";
import { VariedadTestHelper } from "./variedadTestHelper";

let app: Express;
let variedadTestHelper: VariedadTestHelper;
let api: SuperTest<supertest.Test>;

beforeAll(async () => {
  jest.setTimeout(30000);
  try {
    const di = await connect();
    app = createServer(di.em);
    api = supertest(app);
    variedadTestHelper = new VariedadTestHelper(di.em);
  } catch (error) {
    console.log(error);
  }
});

beforeEach(async () => {
  await variedadTestHelper.em.nativeDelete(Variedad, {});
  variedadTestHelper.initVariedades();
  await variedadTestHelper.em.persistAndFlush(
    variedadTestHelper.variedadesIniciales
  );
});

describe("recuperar todas las variedades", () => {
  test("si no hay nada, se devuelve un 404", async () => {
    await variedadTestHelper.em.nativeDelete(Variedad, {});
    const res = await api.get("/admin/variedad").expect(404);
    expect(res.body).toStrictEqual({ mensaje: "no se encontraron variedades" });
  });
  test("devuelve notas", async () => {
    const res = await supertest(app)
      .get("/admin/variedad")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(res.body).toHaveLength(
      variedadTestHelper.variedadesIniciales.length
    );
  });
});

describe("una variedad es creada", () => {
  test("si no hay nombre, falla", async () => {
    const variedad = variedadTestHelper.em.create(Variedad, {});
    await api.post("/admin/variedad").send(variedad).expect(400);
    const variedades = await variedadTestHelper.variedadAtDb();
    expect(variedades).toHaveLength(
      variedadTestHelper.variedadesIniciales.length
    );
  });
  test("si ya existe una var con ese nombre, falla", async () => {
    const variedad = variedadTestHelper.em.create(Variedad, {
      nombreVariedad: "var1",
      codVariedad: 4,
    });
    await api.post("/admin/variedad").send(variedad).expect(400);
    const variedades = await variedadTestHelper.variedadAtDb();
    expect(variedades).toHaveLength(
      variedadTestHelper.variedadesIniciales.length
    );
  });
  test("una variedad se crea correctamente", async () => {
    const variedad = variedadTestHelper.em.create(Variedad, {
      nombreVariedad: "var4",
      codVariedad: 4,
    });
    await api.post("/admin/variedad").send(variedad).expect(201);
    const variedades = await variedadTestHelper.variedadAtDb();
    expect(variedades).toHaveLength(
      variedadTestHelper.variedadesIniciales.length + 1
    );
    const nombres = variedades.map((variedad) => variedad.nombreVariedad);
    expect(nombres).toContain("var4");
  });
});

describe("una variedad es actualizada", () => {
  test("no se actualiza una variedad sin nombre", async () => {
    const variedades = await variedadTestHelper.variedadAtDb();
    const variedad = variedades[0];
    const { nombreVariedad, ...updatedVariedad } = variedad;
    await api
      .put(`/admin/variedad/${variedad.uuid}`)
      .send(updatedVariedad)
      .expect(400);
  });
  test("no se actualiza una variedad no vigente", async () => {
    await variedadTestHelper.expiredVariedad();
    const variedades = await variedadTestHelper.variedadAtDb();
    const variedad = variedades.find((variedad) => variedad.codVariedad === 3);
    const updatedVariedad = {
      ...variedad,
      nombreVariedad: "var4new",
    };
    await api
      .put(`/admin/variedad/${variedad!.uuid}`)
      .send(updatedVariedad)
      .expect(403);
    expect(updatedVariedad).not.toStrictEqual(variedad);
  });
  test("no se actualiza una variedad si el nombre ya existe", async () => {
    const variedades = await variedadTestHelper.variedadAtDb();
    const variedad = variedades.find((variedad) => variedad.codVariedad === 3);
    const updatedVariedad = {
      ...variedad,
      nombreVariedad: "var1",
    };
    await api
      .put(`/admin/variedad/${variedad!.uuid}`)
      .send(updatedVariedad)
      .expect(400);
    expect(updatedVariedad).not.toStrictEqual(variedad);
  });
  test("se actualiza una variedad correctamente", async () => {
    const variedades = await variedadTestHelper.variedadAtDb();
    const variedad = variedades.find((variedad) => variedad.codVariedad === 3);
    const updatedVariedad = {
      ...variedad,
      nombreVariedad: "var3new",
    };
    await api
      .put(`/admin/variedad/${variedad!.uuid}`)
      .send(updatedVariedad)
      .expect(200);

    const variedadesAfter = await variedadTestHelper.em.find(Variedad, {});

    expect(variedadesAfter).toHaveLength(
      variedadTestHelper.variedadesIniciales.length
    );
  });
});

describe("una variedad es dada de baja", () => {
  test("una variedad no vigente no se vuelve a dar de baja", async () => {
    await variedadTestHelper.expiredVariedad();
    const variedades = await variedadTestHelper.variedadAtDb();
    const variedad = variedades.find((variedad) => variedad.codVariedad === 3);
    await api
      .delete(`/admin/variedad/${variedad!.uuid}`)
      .send(variedad)
      .expect(403);
  });
  test("una variedad es dada de baja", async () => {
    const variedades = await variedadTestHelper.variedadAtDb();
    const variedad = variedades.find((variedad) => variedad.codVariedad === 3);
    await api
      .delete(`/admin/variedad/${variedad!.uuid}`)
      .send(variedad)
      .expect(204);
  });
});


