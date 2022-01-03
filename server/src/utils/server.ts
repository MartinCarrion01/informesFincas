import express from "express";
import encargadoFincaRouter from "../controllers/admin/EncargadoFincaController";
import productorRouter from "../controllers/admin/ProductorController";
import variedadRouter from "../controllers/admin/VariedadController";
import userRoleRouter from "../controllers/admin/UserRoleController";
import fincaRouter from "../controllers/admin/FincaController";
import { Connection, createConnection} from "typeorm";
import userAdminRouter from "../controllers/admin/UserAdminController";
import userCommonRouter from "../controllers/common/UserCommonController";
import informeCommonRouter from "../controllers/common/InformeCommonController";
const redis = require("redis");
import session from "express-session";
import connectRedis from "connect-redis";
import { auth } from "../middleware/auth";
import informeAdminRouter from "../controllers/admin/InformeAdminController";
import cors from "cors";
import { authorize } from "../middleware/authorize";

export async function createServer() {
  const connection: Connection = await createConnection();

  console.log("is connected:", connection.isConnected);

  const app = express();
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      secret: "agagagagagagaga",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
    })
  );

  app.use(express.json());
  app.use("/api/v1", userCommonRouter);
  app.use(auth);
  app.use("/api/v1", informeCommonRouter);
  app.use(authorize);
  app.use("/api/v1/admin", encargadoFincaRouter);
  app.use("/api/v1/admin", productorRouter);
  app.use("/api/v1/admin", variedadRouter);
  app.use("/api/v1/admin", userRoleRouter);
  app.use("/api/v1/admin", fincaRouter);
  app.use("/api/v1/admin", userAdminRouter);
  app.use("/api/v1/admin", informeAdminRouter);

  return app;
}
