import { EntityManager } from "@mikro-orm/core";
import { Variedad } from "../../entities/Variedad";

export class VariedadTestHelper {
  em: EntityManager;
  variedadesIniciales: Variedad[];
  constructor(em: EntityManager) {
    this.em = em;
  }
  initVariedades() {
    this.variedadesIniciales = [
      this.em.create(Variedad, { nombreVariedad: "var1", codVariedad: 1 }),
      this.em.create(Variedad, { nombreVariedad: "var2", codVariedad: 2 }),
      this.em.create(Variedad, { nombreVariedad: "var3", codVariedad: 3 }),
    ];
  }
  async expiredVariedad() {
    const variedad = await this.em.findOne(Variedad, { codVariedad: 3 });
    if (variedad) {
      variedad.active = false;
      await this.em.persistAndFlush(variedad);
    }
  }
  async variedadAtDb() {
    return await this.em.find(Variedad, {});
  }
}
