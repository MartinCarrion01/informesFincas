import express, { Request, Response } from "express";
import { Productor } from "../../entities/Productor";
import { DI } from "../../index";

const productorRouter = express.Router();

productorRouter.get("/productor", async (_req: Request, res: Response) => {
  const productores = await DI.em.find(Productor, {});
  if (productores.length !== 0) {
    res.status(200).json(productores);
  } else {
    res.status(404).json({ mensaje: "no se encontraron Productores" });
  }
});

productorRouter.post("/productor", async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.nombreProductor) {
    return res
      .status(400)
      .json({ error: "Petición inválida, falta nombre de la Productor" });
  }

  try {
    const productor = DI.em.create(Productor, {
      nombreProductor: body.nombreProductor,
      codProductor: body.codProductor,
    });
    await DI.em.persistAndFlush(productor);
    return res.status(201).json(productor);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

productorRouter.put("/productor/:id", async (req: Request, res: Response) => {
  const idProductor = req.params.id;
  const body = req.body;

  if (!body.nombreProductor) {
    return res
      .status(400)
      .json({ error: "Petición inválida, falta nombre del productor" });
  }

  try {
    const productor = await DI.em.findOne(Productor, {
      uuid: idProductor,
    });
    if (!productor) {
      return res
        .status(404)
        .json({ error: "El productor especificado no es existe" });
    }
    if (!productor.active) {
      return res
        .status(403)
        .json({ error: "El productor especificado no es vigente" });
    }
    productor.nombreProductor = body.nombreProductor;
    await DI.em.persistAndFlush(productor);
    return res.status(200).json(productor);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

productorRouter.delete(
  "/productor/:id",
  async (req: Request, res: Response) => {
    const idProductor = req.params.id;
    try {
      const productor = await DI.em.findOne(Productor, {
        uuid: idProductor,
      });
      if (!productor) {
        return res
          .status(404)
          .json({ error: "El productor especificado no es válido" });
      }
      if (!productor.active) {
        return res
          .status(403)
          .json({ error: "El productor especificado no es vigente" });
      }
      productor.active = false;
      await DI.em.persistAndFlush(productor);
      return res.status(204).json({
        mensaje: `El productor ${productor.nombreProductor} fue eliminado exitosamente`,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

export default productorRouter;
