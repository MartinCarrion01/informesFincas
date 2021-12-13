import { __prod__ } from "./constants";
import { Informe } from "./entities/Informe";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { InformeComentario } from "./entities/InformeComentario";
import { Finca } from "./entities/Finca";
import { EncargadoFinca } from "./entities/EncargadoFinca";
import { Productor } from "./entities/Productor";
import { Variedad } from "./entities/Variedad";
import { User } from "./entities/User";
import { UserRole } from "./entities/UserRole";
import { InformeComentarioEdicion } from "./entities/InformeComentarioEdicion";

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
    User,
    UserRole,
    InformeComentarioEdicion,
  ],
} as Parameters<typeof MikroORM.init>[0];
