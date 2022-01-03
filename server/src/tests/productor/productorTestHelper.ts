import { EntityManager } from "typeorm";
import { Productor } from "../../entities/Productor";

export class ProductorTestHelper {
  em: EntityManager;
  productoresIniciales: Productor[];
  constructor(em: EntityManager) {
    this.em = em;
  }
  initProductores() {
    this.productoresIniciales = [
      this.em.create(Productor, { nombreProductor: "prod1" }),
      this.em.create(Productor, { nombreProductor: "prod2"}),
      this.em.create(Productor, { nombreProductor: "prod3"}),
    ];
  }
  async expiredProductor() {
    const productor = await this.em.findOne(Productor, { nombreProductor: "prod3" });
    if (productor) {
      productor.active = false;
      await this.em.save(productor);
    }
  }
  async productorAtDb() {
    return await this.em.find(Productor, {});
  }
}
