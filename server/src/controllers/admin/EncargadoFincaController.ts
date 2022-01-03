import express, { Request, Response } from "express";
import { EncargadoFinca } from "../../entities/EncargadoFinca";
import { getManager } from "typeorm";

const encargadoFincaRouter = express.Router();

encargadoFincaRouter.get(
  "/encargadofinca",
  async (_req: Request, res: Response) => {
    try {
      const encargadosFinca = await getManager().find(EncargadoFinca, {});
      if (encargadosFinca.length !== 0) {
        res.status(200).json(encargadosFinca);
      } else {
        res
          .status(404)
          .json({ mensaje: "no se encontraron encargados de finca" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

encargadoFincaRouter.post(
  "/encargadofinca",
  async (req: Request, res: Response) => {
    const body = req.body;

    if (!body.nombreEncargadoFinca || !body.numeroEncargadoFinca) {
      if (!body.nombreEncargadoFinca && !body.numeroEncargadoFinca) {
        return res.status(400).json({
          error:
            "Petición inválida, falta nombre y número del encargado de la finca",
        });
      }
      if (!body.nombreEncargadoFinca) {
        return res.status(400).json({
          error: "Petición inválida, falta nombre del encargado de la finca",
        });
      }

      if (!body.numeroEncargadoFinca) {
        return res.status(400).json({
          error: "Petición inválida, falta número del encargado de la finca",
        });
      }
    }
    try {
      const encargadoFinca = getManager().create(EncargadoFinca, {
        nombreEncargadoFinca: body.nombreEncargadoFinca,
        numeroEncargadoFinca: body.numeroEncargadoFinca,
      });
      await getManager().save(encargadoFinca);
      return res.status(201).json(encargadoFinca);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
);

encargadoFincaRouter.put(
  "/encargadofinca/:id",
  async (req: Request, res: Response) => {
    const idEncargadoFinca = req.params.id;
    const body = req.body;

    if (!body.nombreEncargadoFinca || !body.numeroEncargadoFinca) {
      if (!body.nombreEncargadoFinca && !body.numeroEncargadoFinca) {
        return res.status(400).json({
          error:
            "Petición inválida, falta nombre y número del encargado de la finca",
        });
      }
      if (!body.nombreEncargadoFinca) {
        return res.status(400).json({
          error: "Petición inválida, falta nombre del encargado de la finca",
        });
      }

      if (!body.numeroEncargadoFinca) {
        return res.status(400).json({
          error: "Petición inválida, falta número del encargado de la finca",
        });
      }
    }

    try {
      const encargadoFinca = await getManager().findOne(EncargadoFinca, {
        uuid: idEncargadoFinca,
      });
      if (!encargadoFinca) {
        return res
          .status(404)
          .json({ error: "El encargadoFinca especificado no es existe" });
      }
      if (!encargadoFinca.active) {
        return res
          .status(403)
          .json({ error: "El encargadoFinca especificado no es vigente" });
      }
      encargadoFinca.nombreEncargadoFinca = body.nombreEncargadoFinca;
      encargadoFinca.numeroEncargadoFinca = body.numeroEncargadoFinca;
      await getManager().save(encargadoFinca);
      return res.status(200).json(encargadoFinca);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

encargadoFincaRouter.delete(
  "/encargadofinca/:id",
  async (req: Request, res: Response) => {
    const idEncargadoFinca = req.params.id;
    try {
      const encargadoFinca = await getManager().findOne(EncargadoFinca, {
        uuid: idEncargadoFinca,
      });
      if (!encargadoFinca) {
        return res
          .status(404)
          .json({ error: "El encargadoFinca especificado no es válido" });
      }
      if (!encargadoFinca.active) {
        return res
          .status(403)
          .json({ error: "El encargadoFinca especificado no es vigente" });
      }
      encargadoFinca.fechaFinVigencia = new Date()
      encargadoFinca.active = false;
      await getManager().save(encargadoFinca);
      return res.status(204).json({
        mensaje: `El encargadoFinca ${encargadoFinca.nombreEncargadoFinca} fue eliminado exitosamente`,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

export default encargadoFincaRouter;
