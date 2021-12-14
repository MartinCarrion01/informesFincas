import { EntityManager, RequestContext } from "@mikro-orm/core";
import express from "express";
import encargadoFincaRouter from "../controllers/admin/EncargadoFincaController";
import productorRouter from "../controllers/admin/ProductorController";
import variedadRouter from "../controllers/admin/VariedadController";
import userRoleRouter from "../controllers/admin/UserRoleController";

export function createServer(em: EntityManager) {
  const app = express();

  app.use(express.json());
  app.use((_req, _res, next) => RequestContext.create(em, next));
  app.get("/", (_req, res) =>
    res.json({
      message:
        "Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!",
    })
  );
  app.use("/admin", variedadRouter);
  app.use("/admin", productorRouter);
  app.use("/admin", encargadoFincaRouter);
  app.use("/admin", userRoleRouter);

  return app;
}
