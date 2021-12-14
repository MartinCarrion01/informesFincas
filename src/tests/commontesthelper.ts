import { MikroORM, EntityManager } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config";

export async function connect() {
  const di = {} as {
    orm: MikroORM;
    em: EntityManager;
  };

  di.orm = await MikroORM.init(mikroOrmConfig);
  di.em = di.orm.em;

  console.log("connected to bd", di.orm.isConnected());

  return di;
}
