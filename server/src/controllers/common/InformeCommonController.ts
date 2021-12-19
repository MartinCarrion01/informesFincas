import express, { Request, Response } from "express";
import { Finca } from "../../entities/Finca";
import { getManager } from "typeorm";
import { Informe } from "../../entities/Informe";
import { Variedad } from "../../entities/Variedad";
import { User } from "../../entities/User";
import { InformeComentario } from "../../entities/InformeComentario";
import { InformeCosechaEstimada } from "../../entities/InformeCosechaEstimada";

const informeRouter = express.Router();

informeRouter.get("/informe", async (_req: Request, res: Response) => {
  try {
    const informes = await getManager()
      .createQueryBuilder(Informe, "informe")
      .leftJoinAndSelect("informe.finca", "finca")
      .leftJoinAndSelect("informe.variedad", "variedad")
      .leftJoinAndSelect("informe.usuarioRecorredor", "usuario")
      .where("informe.active = :active", { active: true })
      .select([
        "informe.informeTitulo",
        "informe.fechaIngreso",
        "finca.nombreFinca",
        "variedad.nombreVariedad",
        "informe.cantKgEstimadoCosecha",
        "informe.fechaEstimadaCosecha",
        "usuario.nombreUsuario",
        "usuario.apellidoUsuario",
        "usuario.dniUsuario",
      ])
      .getMany();
    if (!informes) {
      return res.status(404).json({ mensaje: "No se han encontrado informes" });
    }
    return res.status(200).json(informes);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

informeRouter.post("/informe", async (req: Request, res: Response) => {
  const body = req.body;
  console.log("got request");
  try {
    const finca = await getManager().findOne(Finca, {
      where: { uuid: body.fincaUuid },
    });
    console.log("finca", finca);
    const variedad = await getManager().findOne(Variedad, {
      where: { uuid: body.variedadUuid },
    });
    const userUuid = (req.session as any).userUuid;
    const user = await getManager().findOne(User, {
      where: { uuid: userUuid },
    });
    const informe = getManager().create(Informe, {
      codInforme: body.codInforme,
      informeTitulo: `Informe recorrida ${new Date().toLocaleDateString()} ${
        finca?.nombreFinca
      } ${variedad?.nombreVariedad}`,
      finca: finca,
      usuarioRecorredor: user,
      variedad: variedad,
    });
    const informeComentario = getManager().create(InformeComentario, {
      descripcion: body.comentarioDescripcion,
    });
    informe.informeComentarios = [informeComentario];
    const informeCosechaEstimada = getManager().create(InformeCosechaEstimada, {
      cantKgEstimadoCosecha: body.cantKgEstimadoCosecha,
      fechaEstimadaCosecha: new Date(body.fechaEstimadaCosecha),
    });
    informe.informeCosechasEstimadas = [informeCosechaEstimada];
    await getManager().save(informe);
    return res.status(201).json(informe);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

informeRouter.post("/informe/:id", async (req: Request, res: Response) => {
  const body = req.body;
  const idInforme = req.params.id;
  console.log("got request");
  try {
    const informe = await getManager().findOne(Informe, {
      where: { uuid: idInforme, active: true },
      relations: ["informeComentarios", "informeCosechasEstimadas"],
    });
    if (!informe) {
      return res
        .status(404)
        .json({ mensaje: "El informe requerido no existe" });
    }
    const informeComentario = getManager().create(InformeComentario, {
      descripcion: body.comentarioDescripcion,
    });
    informe.informeComentarios =
      informe.informeComentarios.concat(informeComentario);
    if (body.cantKgEstimadoCosecha && body.fechaEstimadaCosecha) {
      const informeCosechaEstimada = getManager().create(
        InformeCosechaEstimada,
        {
          cantKgEstimadoCosecha: body.cantKgEstimadoCosecha,
          fechaEstimadaCosecha: new Date(body.fechaEstimadaCosecha),
        }
      );
      informe.informeCosechasEstimadas.forEach(
        (cosechaEstimada) => (cosechaEstimada.active = false)
      );
      informe.informeCosechasEstimadas =
        informe.informeCosechasEstimadas.concat(informeCosechaEstimada);
      await getManager().save(informe);
      return res.status(200).json(informe);
    }
    informe.cantKgRealCosecha = body.cantKgRealCosecha;
    informe.fechaRealCosecha = new Date();
    await getManager().save(informe);
    return res.status(201).json(informe);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default informeRouter;
