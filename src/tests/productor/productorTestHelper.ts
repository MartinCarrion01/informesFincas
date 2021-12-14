import { EntityManager } from "@mikro-orm/core";
import { Productor } from "../../entities/Productor";

export class ProductorTestHelper {
  em: EntityManager;
  productoresIniciales: Productor[];
  constructor(em: EntityManager) {
    this.em = em;
  }
  initProductores() {
    this.productoresIniciales = [
      this.em.create(Productor, { nombreProductor: "prod1", codProductor: 1 }),
      this.em.create(Productor, { nombreProductor: "prod2", codProductor: 2 }),
      this.em.create(Productor, { nombreProductor: "prod3", codProductor: 3 }),
    ];
  }
  async expiredProductor() {
    const productor = await this.em.findOne(Productor, { codProductor: 3 });
    if (productor) {
      productor.active = false;
      await this.em.persistAndFlush(productor);
    }
  }
  async productorAtDb() {
    return await this.em.find(Productor, {});
  }
}
