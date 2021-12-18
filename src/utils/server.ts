import express from "express";
import encargadoFincaRouter from "../controllers/admin/EncargadoFincaController";
import productorRouter from "../controllers/admin/ProductorController";
import variedadRouter from "../controllers/admin/VariedadController";
import userRoleRouter from "../controllers/admin/UserRoleController";
import fincaRouter from "../controllers/admin/FincaController";
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import userAdminRouter from "../controllers/admin/UserAdminController";
import userCommonRouter from "../controllers/common/UserCommonController";
import informeCommonRouter from "../controllers/common/InformeCommonController";
const redis = require("redis");
import session from "express-session";
import connectRedis from "connect-redis";
import { auth } from "../middleware/auth";
import informeAdminRouter from "../controllers/admin/InformeAdminController";

export async function createServer() {
  const options = await getConnectionOptions(process.env.NODE_ENV);

  const connection: Connection = await createConnection({
    ...options,
    name: "default",
  });

  if (process.env.NODE_ENV !== "test") {
    await connection.runMigrations();
  }

  console.log("is connected:", connection.isConnected);

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      secret: "agagagagagagaga",
      resave: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false },
    })
  );

  app.use(express.json());
  app.use(userCommonRouter);
  app.use(auth);
  app.use("/admin", encargadoFincaRouter);
  app.use("/admin", productorRouter);
  app.use("/admin", variedadRouter);
  app.use("/admin", userRoleRouter);
  app.use("/admin", fincaRouter);
  app.use("/admin", userAdminRouter);
  app.use(informeCommonRouter);
  app.use("/admin", informeAdminRouter);

  return app;
}
