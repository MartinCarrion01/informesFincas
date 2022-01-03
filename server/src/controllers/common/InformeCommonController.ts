import express, { Request, Response } from "express";
import { Finca } from "../../entities/Finca";
import { getManager } from "typeorm";
import { Informe } from "../../entities/Informe";
import { Variedad } from "../../entities/Variedad";
import { User } from "../../entities/User";
import { InformeComentario } from "../../entities/InformeComentario";
import { InformeCosechaEstimada } from "../../entities/InformeCosechaEstimada";
import { Productor } from '../../entities/Productor';
import { codInformeGenerator } from '../../utils/codInformeGenerator';

const informeRouter = express.Router();

informeRouter.get("/informe", async (_req: Request, res: Response) => {
  console.log("got request");
  try {
    const informes = await getManager()
      .createQueryBuilder(Informe, "informe")
      .leftJoinAndSelect("informe.finca", "finca")
      .leftJoinAndSelect("finca.productor", "productor")
      .leftJoinAndSelect("informe.variedad", "variedad")
      .leftJoinAndSelect("informe.usuarioRecorredor", "usuario")
      .leftJoinAndSelect("informe.informeCosechasEstimadas", "cosechas")
      .where("informe.active = :active", { active: true })
      .andWhere("cosechas.active = :active", { active: true })
      .select([
        "informe.uuid",
        "informe.informeTitulo",
        "informe.fechaIngreso",
        "informe.fechaRealCosecha",
        "informe.cantKgRealCosecha",
        "finca.nombreFinca",
        "variedad.nombreVariedad",
        "usuario.nombreUsuario",
        "usuario.apellidoUsuario",
        "usuario.uuid",
        "cosechas.cantKgEstimadoCosecha",
        "cosechas.fechaEstimadaCosecha",
        "productor.nombreProductor",
      ])
      .orderBy("informe.fechaIngreso", "DESC")
      .getMany();
    console.log("informes", informes);
    if (informes.length === 0) {
      return res.status(404).json({ mensaje: "No se han encontrado informes" });
    }
    return res.status(200).json(informes);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

informeRouter.get("/informe/:id", async (req: Request, res: Response) => {
  console.log("got request");
  const informeId = req.params.id;
  try {
    const informe = await getManager()
      .createQueryBuilder(Informe, "informe")
      .leftJoinAndSelect("informe.finca", "finca")
      .leftJoinAndSelect("finca.productor", "productor")
      .leftJoinAndSelect("finca.encargadoFinca", "encargado")
      .leftJoinAndSelect("informe.variedad", "variedad")
      .leftJoinAndSelect("informe.usuarioRecorredor", "usuario")
      .leftJoinAndSelect("informe.informeCosechasEstimadas", "cosechas")
      .leftJoinAndSelect("informe.informeComentarios", "comentarios")
      .where("informe.uuid = :id", { id: informeId })
      .where("informe.active = :active", { active: true })
      .andWhere("cosechas.active = :active", { active: true })
      .select([
        "informe.informeTitulo",
        "informe.fechaIngreso",
        "informe.fechaRealCosecha",
        "informe.cantKgRealCosecha",
        "informe.uuid",
        "finca.nombreFinca",
        "variedad.nombreVariedad",
        "usuario.nombreUsuario",
        "usuario.apellidoUsuario",
        "usuario.uuid",
        "cosechas.cantKgEstimadoCosecha",
        "cosechas.fechaEstimadaCosecha",
        "productor.nombreProductor",
        "encargado.nombreEncargadoFinca",
        "encargado.numeroEncargadoFinca",
        "comentarios.uuid",
        "comentarios.descripcion",
        "comentarios.fechaIngreso",
      ]).orderBy( "comentarios.fechaIngreso", "DESC")
      .getOne();
    console.log("informe", informe);
    if (!informe) {
      return res
        .status(404)
        .json({ mensaje: "No se ha encontrado el informe especificado" });
    }
    return res.status(200).json(informe);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

informeRouter.get("/data", async (_req: Request, res: Response) => {
  try {
    const fincas = await getManager()
      .createQueryBuilder(Finca, "finca")
      .leftJoinAndSelect("finca.productor", "productor")
      .where("finca.active= :active", { active: true })
      .select(["finca.nombreFinca", "finca.uuid", "productor.uuid", "productor.nombreProductor"])
      .getMany();

    const variedades = await getManager()
      .createQueryBuilder(Variedad, "variedad")
      .leftJoinAndSelect("variedad.fincas", "finca")
      .where("variedad.active= :active", { active: true })
      .select(["variedad.nombreVariedad", "variedad.uuid", "finca.nombreFinca", "finca.uuid"])
      .getMany();

      const productores = await getManager()
      .createQueryBuilder(Productor, "productor")
      .where("active= :active", { active: true })
      .select(["productor.nombreProductor", "productor.uuid"])
      .getMany();

    if (fincas.length === 0 || variedades.length === 0 || productores.length === 0) {
      if (fincas.length === 0 && variedades.length === 0 && productores.length === 0) {
        return res.status(404).json({
          mensaje: "No hay fincas ni variedades ni productores activos en este momento",
        });
      }
      if (fincas.length === 0) {
        return res
          .status(404)
          .json({ mensaje: "No hay fincas activas en este momento" });
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
    const data = { fincas, variedades, productores };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

informeRouter.get("/misinformes", async (req: Request, res: Response) => {
  try {
    const informes = await getManager()
      .createQueryBuilder(Informe, "informe")
      .leftJoinAndSelect("informe.finca", "finca")
      .leftJoinAndSelect("finca.productor", "productor")
      .leftJoinAndSelect("informe.variedad", "variedad")
      .leftJoinAndSelect("informe.usuarioRecorredor", "usuario")
      .leftJoinAndSelect("informe.informeCosechasEstimadas", "cosechas")
      .where("informe.active = :active", { active: true })
      .andWhere("usuario.uuid = :uuid", {uuid: (req.session as any).userUuid})
      .andWhere("cosechas.active = :active", { active: true })
      .select([
        "informe.uuid",
        "informe.informeTitulo",
        "informe.fechaIngreso",
        "informe.fechaRealCosecha",
        "informe.cantKgRealCosecha",
        "finca.nombreFinca",
        "variedad.nombreVariedad",
        "usuario.nombreUsuario",
        "usuario.apellidoUsuario",
        "usuario.uuid",
        "cosechas.cantKgEstimadoCosecha",
        "cosechas.fechaEstimadaCosecha",
        "productor.nombreProductor",
      ])
      .orderBy("informe.fechaIngreso", "DESC")
      .getMany();
    console.log("informes", informes);
    if (informes.length === 0) {
      return res.status(404).json({ mensaje: "No ha realizado ningún informe" });
    }
    return res.status(200).json(informes);
  } catch (error) {
    return res.status(400).json({ error });
  }
})

informeRouter.get("/alldata", async (_req: Request, res: Response) => {
  try {
    const fincas = await getManager()
      .createQueryBuilder(Finca, "finca")
      .select(["finca.nombreFinca", "finca.uuid"])
      .getMany();

    const variedades = await getManager()
      .createQueryBuilder(Variedad, "variedad")
      .select(["variedad.nombreVariedad", "variedad.uuid"])
      .getMany();

      const productores = await getManager()
      .createQueryBuilder(Productor, "productor")
      .select(["productor.nombreProductor", "productor.uuid"])
      .getMany();

    if (fincas.length === 0 || variedades.length === 0 || productores.length === 0) {
      if (fincas.length === 0 && variedades.length === 0 && productores.length === 0) {
        return res.status(404).json({
          mensaje: "No hay fincas ni variedades ni productores en este momento",
        });
      }
      if (fincas.length === 0) {
        return res
          .status(404)
          .json({ mensaje: "No hay fincas en este momento" });
      }

      if (variedades.length === 0) {
        return res
          .status(404)
          .json({ mensaje: "No hay variedades en este momento" });
      }
      if (productores.length === 0) {
        return res
          .status(404)
          .json({ mensaje: "No hay productores en este momento" });
      }
    }
    const data = { fincas, variedades, productores };
    return res.status(200).json(data);
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
    const cod = await codInformeGenerator()
    const informe = getManager().create(Informe, {
      informeTitulo: `Informe recorrida #${cod} ${new Date().toLocaleDateString()} ${
        finca?.nombreFinca
      } ${variedad?.nombreVariedad}`,
      finca: finca,
      usuarioRecorredor: user,
      variedad: variedad,
      codInforme: cod
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
    informe.fechaRealCosecha = body.fechaRealCosecha;
    await getManager().save(informe);
    return res.status(201).json(informe);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

informeRouter.get(
  "/validateinforme/:id",
  async (req: Request, res: Response) => {
    try {
      const informe = await getManager()
        .createQueryBuilder(Informe, "informe")
        .leftJoinAndSelect("informe.usuarioRecorredor", "usuario")
        .where("informe.uuid = :id", { id: req.params.id })
        .select(["informe.uuid", "usuario.uuid", "informe.fechaRealCosecha"])
        .getOne();
      console.log("got validate request", informe);
      if (!informe) {
        return res.status(404).json({
          mensaje:
            "El informe al que le desea agregar un comentario, no existe",
        });
      }
      if (informe.usuarioRecorredor.uuid !== (req.session as any).userUuid) {
        return res.status(403).json({
          mensaje:
            "Usted no tiene permiso para agregar un comentario al informe solicitado",
        });
      }
      if (informe.fechaRealCosecha) {
        return res.status(400).json({
          mensaje:
            "El informe ya fue cerrado, no es posible agregar comentarios",
        });
      }
      return res.status(200).json({ mensaje: "Proceda" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

informeRouter.get("/csvinformes", async (_req: Request, res: Response) => {
  try {
    const informes = await getManager()
      .createQueryBuilder(Informe, "informe")
      .leftJoinAndSelect("informe.finca", "finca")
      .leftJoinAndSelect("finca.productor", "productor")
      .leftJoinAndSelect("informe.variedad", "variedad")
      .leftJoinAndSelect("informe.usuarioRecorredor", "usuario")
      .leftJoinAndSelect("informe.informeCosechasEstimadas", "cosechas")
      .where("informe.active = :active", { active: true })
      .andWhere("cosechas.active = :active", { active: true })
      .select([
        "informe.uuid",
        "informe.codInforme",
        "informe.informeTitulo",
        "informe.fechaIngreso",
        "informe.fechaRealCosecha",
        "informe.cantKgRealCosecha",
        "finca.nombreFinca",
        "variedad.nombreVariedad",
        "usuario.nombreUsuario",
        "usuario.apellidoUsuario",
        "usuario.uuid",
        "cosechas.cantKgEstimadoCosecha",
        "cosechas.fechaEstimadaCosecha",
        "productor.nombreProductor",
      ])
      .orderBy("informe.codInforme", "ASC")
      .getMany();
    console.log("informes", informes);
    if (informes.length === 0) {
      return res.status(404).json({ mensaje: "No se han encontrado informes" });
    }
    let csvArray = [];
    for (let i = 0; i < informes.length; i++) {
      let informe = [];
      informe.push(informes[i].codInforme);
      informe.push(informes[i].informeTitulo);
      informe.push(informes[i].fechaIngreso);
      informe.push(
        informes[i].usuarioRecorredor.nombreUsuario +
          " " +
          informes[i].usuarioRecorredor.apellidoUsuario
      );
      informe.push(informes[i].finca.nombreFinca);
      informe.push(informes[i].finca.productor.nombreProductor);
      informe.push(informes[i].variedad.nombreVariedad);
      informe.push(
        informes[i].informeCosechasEstimadas[0].fechaEstimadaCosecha
      );
      informe.push(
        informes[i].informeCosechasEstimadas[0].cantKgEstimadoCosecha
      );
      informe.push(
        informes[i].fechaRealCosecha
          ? informes[i].fechaRealCosecha
          : "Sin cosechar aún"
      );
      informe.push(
        informes[i].fechaRealCosecha
          ? informes[i].cantKgRealCosecha
          : "Sin cosechar aún"
      );
      csvArray.push(informe);
    }
    return res.status(200).json(csvArray);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default informeRouter;
