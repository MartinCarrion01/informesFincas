import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import { EntityManager, MikroORM } from "@mikro-orm/core";
import config from "./utils/config";
import { createServer } from "./utils/server";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

const main = async () => {
  DI.orm = await MikroORM.init(mikroOrmConfig);

  DI.em = DI.orm.em;

  const app = createServer(DI.orm.em);

  if (process.env.NODE_ENV !== "test") {
    app.listen(config.PORT, () => console.log("Listening on", config.PORT));
  }
};

main().catch((err) => console.error(err));
