import { Express } from "express-serve-static-core";
import { Finca } from "../../entities/Finca";
import { Productor } from "../../entities/Productor";
import { EncargadoFinca } from "../../entities/EncargadoFinca";
import supertest, { SuperTest } from "supertest";
import { createServer } from "../../utils/server";
import { FincaTestHelper } from "./fincaTestHelper";
import { Variedad } from "../../entities/Variedad";
import { getManager } from "typeorm";

let app: Express;
let fincaTestHelper: FincaTestHelper;
let api: SuperTest<supertest.Test>;

beforeAll(async () => {
  try {
    app = await createServer();
    api = supertest(app);
    fincaTestHelper = new FincaTestHelper(getManager());
  } catch (error) {
    console.log(error);
  }
}, 3000000);

beforeEach(async () => {
  await fincaTestHelper.em.save(Finca, {});
  await fincaTestHelper.em.save(Productor, {});
  await fincaTestHelper.em.save(EncargadoFinca, {});
  await fincaTestHelper.em.save(Variedad, {});

  await fincaTestHelper.initFincas();
  await fincaTestHelper.em.save(fincaTestHelper.fincasIniciales);
});

describe("obtener todas las fincas", () => {
  test("no hay fincas cargadas, devolver 404", async () => {
    await fincaTestHelper.em.delete(Finca, {});
    const res = await api.get("/admin/finca").expect(404);
    expect(res.body).toStrictEqual({
      mensaje: "no se encontraron Fincas",
    });
  });
  test("hay fincas cargadas", async () => {
    const res = await api
      .get("/admin/finca")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log("body", res.body);
    expect(res.body).toHaveLength(fincaTestHelper.fincasIniciales.length);
  });
});
