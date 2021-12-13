import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import {
  EntityManager,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";
import express from "express";
import config from "./utils/config";
import variedadRouter from "./controllers/admin/VariedadController";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

const main = async () => {
  const app = express();

  DI.orm = await MikroORM.init(mikroOrmConfig);

  DI.em = DI.orm.em;

  app.use(express.json());
  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));
  app.get("/", (_req, res) =>
    res.json({
      message:
        "Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!",
    })
  );
  app.use("/admin", variedadRouter);

  app.listen(config.PORT, () => console.log("Listening on", config.PORT));
};

main().catch((err) => console.error(err));
