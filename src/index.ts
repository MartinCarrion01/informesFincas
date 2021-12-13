import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Informe } from "./entities/Informe";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  //await orm.getMigrator().up();

  // const informe = orm.em.create(Informe, {
  //   codInforme: 4,
  //   cantKgEstimadoCosecha: 32,
  //   fechaEstimadaCosecha: new Date(),
  // });
  // await orm.em.persistAndFlush(informe);

  const informes = await orm.em.find(Informe, {});
  console.log("informes: ", informes);
};

main().catch((err) => console.error(err));
