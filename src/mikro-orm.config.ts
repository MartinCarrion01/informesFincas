import { __prod__ } from "./constants";
import { Informe } from "./entities/Informe";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { InformeComentario } from "./entities/InformeComentario";
import { Finca } from "./entities/Finca";
import { EncargadoFinca } from "./entities/EncargadoFinca";
import { Productor } from "./entities/Productor";
import { Variedad } from "./entities/Variedad";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations/"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: "informesfincas",
  user: "root",
  password: "password",
  type: "mysql",
  debug: !__prod__,
  entities: [
    Informe,
    InformeComentario,
    Finca,
    EncargadoFinca,
    Productor,
    Variedad,
  ],
} as Parameters<typeof MikroORM.init>[0];
