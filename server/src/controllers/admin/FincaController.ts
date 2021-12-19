import express, { Request, Response } from "express";
import { Finca } from "../../entities/Finca";
import { getManager } from "typeorm";
import { Productor } from "../../entities/Productor";
import { EncargadoFinca } from "../../entities/EncargadoFinca";
import { Variedad } from "../../entities/Variedad";

const fincaRouter = express.Router();

fincaRouter.get("/finca", async (_req: Request, res: Response) => {
  try {
    const fincas = await getManager().find(Finca, {
      relations: ["encargadoFinca", "productor", "variedades"],
    });
    if (fincas.length !== 0) {
      return res.status(200).json(fincas);
    } else {
      return res.status(404).json({ mensaje: "no hay fincas" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

fincaRouter.post("/finca", async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.nombreFinca) {
    return res
      .status(400)
      .json({ error: "Petición inválida, falta nombre de la finca" });
  }

  try {
    const productor = await getManager().findOne(Productor, {
      where: { uuid: body.productorUuid },
    });
    const encargadoFinca = await getManager().findOne(EncargadoFinca, {
      where: { uuid: body.encargadoFincaUuid },
    });
    const variedades: Variedad[] = [];
    for (let i = 0; i < body.variedades.length; i++) {
      const variedad = await getManager().findOne(Variedad, {
        where: { uuid: body.variedades[i] },
      });
      if (variedad) {
        variedades.push(variedad);
      }
    }
    const finca = getManager().create(Finca, {
      nombreFinca: body.nombreFinca,
      codFinca: body.codFinca,
      coordenadasFinca: body.coordenadasFinca,
      productor: productor,
      encargadoFinca: encargadoFinca,
      variedades: variedades,
    });
    await getManager().save(finca);
    return res.status(201).json(finca);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

export default fincaRouter;
