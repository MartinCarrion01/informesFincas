import { EncargadoFinca } from "../../entities/EncargadoFinca";
import { Productor } from "../../entities/Productor";
import { Finca } from "../../entities/Finca";
import { Variedad } from "../../entities/Variedad";
import { EntityManager } from "typeorm";

export class FincaTestHelper {
  em: EntityManager;
  fincasIniciales: Finca[];
  productoresIniciales: Productor[];
  encargadosFincaIniciales: EncargadoFinca[];
  variedadesIniciales: Variedad[];
  constructor(em: EntityManager) {
    this.em = em;
  }
  async initFincas() {
    await this.initProductores();
    await this.initEncargadosFinca();
    await this.initVariedades();
    this.fincasIniciales = [
      this.em.create(Finca, {
        nombreFinca: "fin1",
        coordenadasFinca: "coord1",
        encargadoFinca: this.encargadosFincaIniciales[0],
        productor: this.productoresIniciales[0],
        variedades: this.variedadesIniciales,
      }),
      this.em.create(Finca, {
        nombreFinca: "fin2",
        coordenadasFinca: "coord2",
        encargadoFinca: this.encargadosFincaIniciales[1],
        productor: this.productoresIniciales[1],
        variedades: this.variedadesIniciales,
      }),
    ];
  }
  async initProductores() {
    this.productoresIniciales = [
      this.em.create(Productor, { nombreProductor: "prod1", codProductor: 1 }),
      this.em.create(Productor, { nombreProductor: "prod2", codProductor: 2 }),
    ];
    await this.em.save(this.productoresIniciales);
    console.log("guardo prod");
  }
  async initEncargadosFinca() {
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
    ];
    await this.em.save(this.encargadosFincaIniciales);
    console.log("guardo enc");
  }
  async initVariedades() {
    this.variedadesIniciales = [
      this.em.create(Variedad, { nombreVariedad: "var1", codVariedad: 1 }),
      this.em.create(Variedad, { nombreVariedad: "var2", codVariedad: 2 }),
    ];
    await this.em.save(this.variedadesIniciales);
    console.log("guardo var");
  }
  async deleteProductor() {
    const productor = await this.em.findOne(Productor, { codProductor: 2 });
    if (productor) {
      productor.active = false;
      await this.em.save(productor);
    }
  }
}
