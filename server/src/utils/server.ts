import express from "express";
import encargadoFincaRouter from "../controllers/admin/EncargadoFincaController";
import productorRouter from "../controllers/admin/ProductorController";
import variedadRouter from "../controllers/admin/VariedadController";
import userRoleRouter from "../controllers/admin/UserRoleController";
import fincaRouter from "../controllers/admin/FincaController";
import { Connection, createConnection } from "typeorm";
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
  let intentos = 20;

  while (intentos) {
    try {
      const connection: Connection = await createConnection({
        type: "mysql",
        host: process.env.DB_HOST || "localhost",
        username: "root",
        password: "password",
        database: "informesfincas",
        logging: true,
        synchronize: false,
        entities: ["dist/entities/**/*.js"],
        migrationsTableName: "migrations_typeorm",
        migrations: ["dist/migrations/**/*.js"],
        cli: {
          entitiesDir: "dist/entities",
          migrationsDir: "dist/migrations",
        },
      });
      await connection.runMigrations();

      console.log("is connected:", connection.isConnected);
      break;
    } catch (error) {
      console.log(error);
      intentos -= 1;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  const app = express();
  app.use(cors({ origin: "https://192.168.1.156:3000", credentials: true }));

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({host: process.env.REDIS_HOST || '127.0.0.1', port: 6379});
  app.set("trust proxy", 1);
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
        secure: true,
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
