import { EntityManager } from "typeorm";
import { Variedad } from "../../entities/Variedad";

export class VariedadTestHelper {
  em: EntityManager;
  variedadesIniciales: Variedad[];
  constructor(em: EntityManager) {
    this.em = em;
  }
  initVariedades() {
    this.variedadesIniciales = [
      this.em.create(Variedad, { nombreVariedad: "var1"}),
      this.em.create(Variedad, { nombreVariedad: "var2"}),
      this.em.create(Variedad, { nombreVariedad: "var3"}),
    ];
  }
  async expiredVariedad() {
    const variedad = await this.em.findOne(Variedad, { nombreVariedad: "var3" });
    if (variedad) {
      variedad.active = false;
      await this.em.save(variedad);
    }
  }
  async variedadAtDb() {
    return await this.em.find(Variedad, {});
  }
}
