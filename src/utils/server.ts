import express from "express";
import encargadoFincaRouter from "../controllers/admin/EncargadoFincaController";
import productorRouter from "../controllers/admin/ProductorController";
import variedadRouter from "../controllers/admin/VariedadController";
import userRoleRouter from "../controllers/admin/UserRoleController";
import fincaRouter from "../controllers/admin/FincaController";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export async function createServer() {

  const options = await getConnectionOptions(process.env.NODE_ENV);
  
  const connection: Connection = await createConnection({...options, name: "default"});

  console.log("is connected:", connection.isConnected);
  
  const app = express();

  app.use(express.json());
  app.get("/", (_req, res) =>
    res.json({
      message:
        "Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!",
    })
  );
  app.use("/admin", encargadoFincaRouter);
  app.use("/admin", productorRouter);
  app.use("/admin", variedadRouter);
  app.use("/admin", userRoleRouter);
  app.use("/admin", fincaRouter);

  return app;
}
