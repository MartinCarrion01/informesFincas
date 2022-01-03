import { getManager } from "typeorm";
import { Informe } from "../entities/Informe";

export const codInformeGenerator = async () => {
  const { max } = await getManager()
    .createQueryBuilder(Informe, "informe")
    .select("MAX(informe.codInforme)", "max")
    .getRawOne();

  if (!max) {
    return 1;
  }

  return max + 1;
};
