import { EntityManager } from "typeorm";
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
      }),
      this.em.create(EncargadoFinca, {
        nombreEncargadoFinca: "enc2",
        numeroEncargadoFinca: "262",
      }),
      this.em.create(EncargadoFinca, {
        nombreEncargadoFinca: "enc3",
        numeroEncargadoFinca: "263",
      }),
    ];
  }
  async expiredEncargadoFinca() {
    const encargadoFinca = await this.em.findOne(EncargadoFinca, {
      nombreEncargadoFinca: "enc3",
    });
    if (encargadoFinca) {
      encargadoFinca.active = false;
      await this.em.save(encargadoFinca);
    }
  }
  async encargadoFincaAtDb() {
    return await this.em.find(EncargadoFinca, {});
  }
}
