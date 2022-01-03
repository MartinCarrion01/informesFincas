import { Express } from "express-serve-static-core";
import { Productor } from "../../entities/Productor";
import supertest, { SuperTest } from "supertest";
import { createServer } from "../../utils/server";
import { ProductorTestHelper } from "./productorTestHelper";
import { getManager } from "typeorm";

let app: Express;
let productorTestHelper: ProductorTestHelper;
let api: SuperTest<supertest.Test>;

beforeAll(async () => {
  try {
    app = await createServer();
    api = supertest(app);
    productorTestHelper = new ProductorTestHelper(getManager());
  } catch (error) {
    console.log(error);
  }
}, 3000000);

beforeEach(async () => {
  await productorTestHelper.em.delete(Productor, {});
  productorTestHelper.initProductores();
  await productorTestHelper.em.save(productorTestHelper.productoresIniciales);
});

describe("recuperar todas las productores", () => {
  test("si no hay nada, se devuelve un 404", async () => {
    await productorTestHelper.em.delete(Productor, {});
    const res = await api.get("/admin/productor").expect(404);
    expect(res.body).toStrictEqual({
      mensaje: "no se encontraron Productores",
    });
  });
  test("devuelve notas", async () => {
    const res = await supertest(app)
      .get("/admin/productor")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(res.body).toHaveLength(
      productorTestHelper.productoresIniciales.length
    );
  });
});

describe("una productor es creada", () => {
  test("si no hay nombre, falla", async () => {
    const productor = productorTestHelper.em.create(Productor, {});
    await api.post("/admin/productor").send(productor).expect(400);
    const productores = await productorTestHelper.productorAtDb();
    expect(productores).toHaveLength(
      productorTestHelper.productoresIniciales.length
    );
  });
  test("si ya existe una var con ese nombre, falla", async () => {
    const productor = productorTestHelper.em.create(Productor, {
      nombreProductor: "prod1",
    });
    await api.post("/admin/productor").send(productor).expect(400);
    const productores = await productorTestHelper.productorAtDb();
    expect(productores).toHaveLength(
      productorTestHelper.productoresIniciales.length
    );
  });
  test("una productor se crea correctamente", async () => {
    const productor = productorTestHelper.em.create(Productor, {
      nombreProductor: "prod4",
    });
    await api.post("/admin/productor").send(productor).expect(201);
    const productores = await productorTestHelper.productorAtDb();
    expect(productores).toHaveLength(
      productorTestHelper.productoresIniciales.length + 1
    );
    const nombres = productores.map((productor) => productor.nombreProductor);
    expect(nombres).toContain("prod4");
  });
});

describe("una productor es actualizada", () => {
  test("no se actualiza una productor sin nombre", async () => {
    const productores = await productorTestHelper.productorAtDb();
    const productor = productores[0];
    const { nombreProductor, ...updatedProductor } = productor;
    await api
      .put(`/admin/productor/${productor.uuid}`)
      .send(updatedProductor)
      .expect(400);
  });
  test("no se actualiza una productor no vigente", async () => {
    await productorTestHelper.expiredProductor();
    const productores = await productorTestHelper.productorAtDb();
    const productor = productores.find(
      (productor) => productor.nombreProductor === "prod3"
    );
    const updatedProductor = {
      ...productor,
      nombreProductor: "prod3new",
    };
    await api
      .put(`/admin/productor/${productor!.uuid}`)
      .send(updatedProductor)
      .expect(403);
    expect(updatedProductor).not.toStrictEqual(productor);
  });
  test("no se actualiza una productor si el nombre ya existe", async () => {
    const productores = await productorTestHelper.productorAtDb();
    const productor = productores.find(
      (productor) => productor.nombreProductor === "prod3"
    );
    const updatedProductor = {
      ...productor,
      nombreProductor: "prod1",
    };
    await api
      .put(`/admin/productor/${productor!.uuid}`)
      .send(updatedProductor)
      .expect(400);
    expect(updatedProductor).not.toStrictEqual(productor);
  });
  test("se actualiza una productor correctamente", async () => {
    const productores = await productorTestHelper.productorAtDb();
    const productor = productores.find(
      (productor) => productor.nombreProductor === "prod3"
    );
    const updatedProductor = {
      ...productor,
      nombreProductor: "prod3new",
    };
    await api
      .put(`/admin/productor/${productor!.uuid}`)
      .send(updatedProductor)
      .expect(200);

    const productoresAfter = await productorTestHelper.em.find(Productor, {});

    expect(productoresAfter).toHaveLength(
      productorTestHelper.productoresIniciales.length
    );
  });
});

describe("una productor es dada de baja", () => {
  test("una productor no vigente no se vuelve a dar de baja", async () => {
    await productorTestHelper.expiredProductor();
    const productores = await productorTestHelper.productorAtDb();
    const productor = productores.find(
      (productor) => productor.nombreProductor === "prod3"
    );
    await api
      .delete(`/admin/productor/${productor!.uuid}`)
      .send(productor)
      .expect(403);
  });
  test("una productor es dada de baja", async () => {
    const productores = await productorTestHelper.productorAtDb();
    const productor = productores.find(
      (productor) => productor.nombreProductor === "prod3"
    );
    await api
      .delete(`/admin/productor/${productor!.uuid}`)
      .send(productor)
      .expect(204);
  });
});
