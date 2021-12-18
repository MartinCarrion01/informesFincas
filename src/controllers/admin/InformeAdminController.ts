import express, { Request, Response } from "express";
import { getManager } from "typeorm";
import { Informe } from "../../entities/Informe";
import { User } from "../../entities/User";
import { InformeComentarioEdicion } from "../../entities/InformeComentarioEdicion";

const informeAdminRouter = express.Router();

informeAdminRouter.delete(
  "/informe/:id",
  async (req: Request, res: Response) => {
    const idInforme = req.params.id;
    console.log("got request");
    try {
      const informe = await getManager().findOne(Informe, {
        where: { uuid: idInforme },
        relations: [
          "informeComentarios",
          "informeComentarios.informeComentarioEdiciones",
          "informeCosechasEstimadas",
        ],
      });
      if (!informe) {
        return res
          .status(404)
          .json({ mensaje: "El informe requerido no existe" });
      }
      if (!informe.active) {
        return res
          .status(400)
          .json({ mensaje: "El informe requerido ya fue dado de baja" });
      }
      informe.informeComentarios.forEach((comentario) => {
        if (comentario.informeComentarioEdiciones) {
          comentario.informeComentarioEdiciones.forEach(
            (edicion) => (edicion.active = edicion.active && false)
          );
        }
        comentario.active = comentario.active && false;
      });
      informe.active = false;
      informe.fechaFinVigencia = new Date();
      await getManager().save(informe);
      return res.status(204).json({
        mensaje: `El informe ${informe.informeTitulo} fue dado de baja satisfactoriamente`,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

informeAdminRouter.put(
  "/informe/:id/:comentarioId",
  async (req: Request, res: Response) => {
    const body = req.body;
    const idInforme = req.params.id;
    const idComentario = req.params.comentarioId;
    try {
      const informe = await getManager().findOne(Informe, {where: {uuid: idInforme}, relations: ['informeComentarios']})
      if (!informe) {
        return res
          .status(404)
          .json({ mensaje: "El informe requerido no existe" });
      }
      const informeComentario = informe.informeComentarios.find(
        (comentario) => comentario.uuid === idComentario
      );
      if (!informeComentario) {
        return res
          .status(404)
          .json({ mensaje: "El comentario requerido no existe" });
      }
      const user = await getManager().findOne(User, {
        where: { uuid: (req.session as any).userUuid },
      });
      const informeEdicion = getManager().create(InformeComentarioEdicion, {
        descripcionNueva: body.descripcionNueva,
        descripcionPrevia: informeComentario.descripcion,
        usuarioEditor: user,
      });
      informeComentario.descripcion = body.descripcionNueva;
      if (!informeComentario.informeComentarioEdiciones) {
        informeComentario.informeComentarioEdiciones = [informeEdicion];
      } else {
        informeComentario.informeComentarioEdiciones =
          informeComentario.informeComentarioEdiciones.concat(informeEdicion);
      }
      informe.informeComentarios.forEach((comentario) => {
        if (comentario.uuid === idComentario) {
          comentario = informeComentario;
        }
      });
      await getManager().save(informe);
      return res.status(200).json(informe);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

export default informeAdminRouter;
