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

fincaRouter.get("/newfincadata", async (_req: Request, res: Response) => {
  try {
    const encargadosFinca = await getManager()
      .createQueryBuilder(EncargadoFinca, "encargadoFinca")
      .where("active= :active", { active: true })
      .select(["encargadoFinca.nombreEncargadoFinca", "encargadoFinca.uuid"])
      .getMany();

    const variedades = await getManager()
      .createQueryBuilder(Variedad, "variedad")
      .where("active= :active", { active: true })
      .select(["variedad.nombreVariedad", "variedad.uuid"])
      .getMany();

    const productores = await getManager()
      .createQueryBuilder(Productor, "productor")
      .where("active= :active", { active: true })
      .select(["productor.nombreProductor", "productor.uuid"])
      .getMany();

    if (
      encargadosFinca.length === 0 ||
      variedades.length === 0 ||
      productores.length === 0
    ) {
      if (
        encargadosFinca.length === 0 &&
        variedades.length === 0 &&
        productores.length === 0
      ) {
        return res.status(404).json({
          mensaje:
            "No hay encargados de finca ni variedades ni productores activos en este momento",
        });
      }
      if (encargadosFinca.length === 0) {
        return res.status(404).json({
          mensaje: "No hay encargados de finca activos en este momento",
        });
      }

      if (variedades.length === 0) {
        return res
          .status(404)
          .json({ mensaje: "No hay variedades activas en este momento" });
      }
      if (productores.length === 0) {
        return res
          .status(404)
          .json({ mensaje: "No hay productores activos en este momento" });
      }
    }
    const data = { encargadosFinca, variedades, productores };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error });
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

fincaRouter.put("/finca/:id", async (req: Request, res: Response) => {
  const fincaUuid = req.params.id;
  const body = req.body;

  try {
    const finca = await getManager().findOne(Finca, { uuid: fincaUuid });
    if (!finca) {
      return res
        .status(404)
        .json({ mensaje: "No existe la finca que desea modificar" });
    }
    if (body.encargadoFincaUuid !== "") {
      const encargadoFinca = await getManager().findOne(EncargadoFinca, {
        uuid: body.encargadoFincaUuid,
      });
      if (!encargadoFinca) {
        return res.status(404).end();
      }
      finca.encargadoFinca = encargadoFinca;
    }
    if (body.productorUuid !== "") {
      const productor = await getManager().findOne(Productor, {
        uuid: body.productorUuid,
      });
      if (!productor) {
        return res.status(404).end();
      }
      finca.productor = productor;
    }

    if (body.variedades.length > 0) {
      let variedades: Variedad[] = [];
      for (let i = 0; i < body.variedades.length; i++) {
        const variedad = await getManager().findOne(Variedad, {
          uuid: body.variedades[i],
        });
        if (!variedad) {
          return res.status(404).end();
        }
        variedades.push(variedad);
      }
      finca.variedades = variedades;
    }

    finca.nombreFinca = body.nombreFinca;
    finca.coordenadasFinca = body.coordenadasFinca;
    await getManager().save(finca);
    return res.status(200).json(finca);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

fincaRouter.delete("/finca/:id", async (req: Request, res: Response) => {
  const idFinca = req.params.id;
  try {
    const finca = await getManager().findOne(Finca, {
      where: { uuid: idFinca },
      relations: ["encargadoFinca"],
    });
    if (!finca) {
      return res
        .status(404)
        .json({ error: "La finca especificado no es válido" });
    }
    if (!finca.active) {
      return res
        .status(403)
        .json({ error: "La finca especificado no es vigente" });
    }
    finca.active = false;
    finca.fechaFinVigencia = new Date();
    finca.encargadoFinca = null;
    await getManager().save(finca);
    return res.status(204).json({
      mensaje: `La finca ${finca.nombreFinca} fue eliminado exitosamente`,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default fincaRouter;
