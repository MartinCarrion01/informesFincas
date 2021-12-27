import express, { Request, Response } from "express";
import { getManager } from "typeorm";
import { Variedad } from "../../entities/Variedad";

const variedadRouter = express.Router();

variedadRouter.get("/variedad", async (_req: Request, res: Response) => {
  try {
    const variedades = await getManager().find(Variedad, {select: ["nombreVariedad", "uuid", "fechaIngreso", "active", "fechaFinVigencia"], order: {nombreVariedad: "ASC"}});
    if (variedades.length !== 0) {
      res.status(200).json(variedades);
    } else {
      res.status(404).json({ mensaje: "no se encontraron variedades" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

variedadRouter.post("/variedad", async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.nombreVariedad) {
    return res
      .status(400)
      .json({ error: "Petición inválida, falta nombre de la variedad" });
  }

  try {
    const variedad = getManager().create(Variedad, {
      nombreVariedad: body.nombreVariedad,
      codVariedad: body.codVariedad,
    });
    await getManager().save(variedad);
    return res.status(201).json(variedad);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

variedadRouter.put("/variedad/:id", async (req: Request, res: Response) => {
  const idVariedad = req.params.id;
  const body = req.body;

  if (!body.nombreVariedad) {
    return res
      .status(400)
      .json({ error: "Petición inválida, falta nombre de la variedad" });
  }

  try {
    const variedad = await getManager().findOne(Variedad, {
      uuid: idVariedad,
    });
    if (!variedad) {
      return res
        .status(404)
        .json({ error: "La variedad especificada no es existe" });
    }
    if (!variedad.active) {
      return res
        .status(403)
        .json({ error: "La variedad especificada no es vigente" });
    }
    variedad.nombreVariedad = body.nombreVariedad;
    await getManager().save(variedad);
    return res.status(200).json(variedad);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

variedadRouter.delete("/variedad/:id", async (req: Request, res: Response) => {
  const idVariedad = req.params.id;
  try {
    const variedad = await getManager().findOne(Variedad, {
      uuid: idVariedad,
    });
    if (!variedad) {
      return res
        .status(404)
        .json({ error: "La variedad especificada no es válida" });
    }
    if (!variedad.active) {
      return res
        .status(403)
        .json({ error: "La variedad especificada no es vigente" });
    }
    variedad.active = false;
    variedad.fechaFinVigencia = new Date();
    await getManager().save(variedad);
    return res.status(204).json({
      mensaje: `La variedad ${variedad.nombreVariedad} fue eliminada exitosamente`,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default variedadRouter;
