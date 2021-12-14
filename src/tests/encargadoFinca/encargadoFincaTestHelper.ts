import { EntityManager } from "@mikro-orm/core";
import { EncargadoFinca } from "../../entities/EncargadoFinca";

export class EncargadoFincaTestHelper {
  em: EntityManager;
  encargadosFincaIniciales: EncargadoFinca[];
  constructor(em: EntityManager) {
    this.em = em;
  }
  initEncargadosFinca() {
    this.encargadosFincaIniciales = [
      this.em.create(EncargadoFinca, {
        nombreEncargadoFinca: "enc1",
        numeroEncargadoFinca: "261",
        codEncargadoFinca: 1,
      }),
      this.em.create(EncargadoFinca, {
        nombreEncargadoFinca: "enc2",
        numeroEncargadoFinca: "262",
        codEncargadoFinca: 2,
      }),
      this.em.create(EncargadoFinca, {
        nombreEncargadoFinca: "enc3",
        numeroEncargadoFinca: "263",
        codEncargadoFinca: 3,
      }),
    ];
  }
  async expiredEncargadoFinca() {
    const encargadoFinca = await this.em.findOne(EncargadoFinca, {
      codEncargadoFinca: 3,
    });
    if (encargadoFinca) {
      encargadoFinca.active = false;
      await this.em.persistAndFlush(encargadoFinca);
    }
  }
  async encargadoFincaAtDb() {
    return await this.em.find(EncargadoFinca, {});
  }
}
