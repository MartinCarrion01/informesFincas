import express, { Request, Response } from "express";
import { getManager } from "typeorm";
import { UserRole } from "../../entities/UserRole";

const userRoleRouter = express.Router();

userRoleRouter.get("/userrole", async (_req: Request, res: Response) => {
  try {
    const userRoles = await getManager().find(UserRole, {where: {active: true}});
    if (userRoles.length !== 0) {
      res.status(200).json(userRoles);
    } else {
      res.status(404).json({ mensaje: "no se encontraron roles de usuario" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userRoleRouter.post("/userrole", async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.nombreUserRole) {
    return res.status(400).json({
      error: "Petición inválida, falta nombre del rol de usuario",
    });
  }

  try {
    const userRole = getManager().create(UserRole, {
      nombreUserRole: body.nombreUserRole,
    });
    await getManager().save(userRole);
    return res.status(201).json(userRole);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

userRoleRouter.put("/userrole/:id", async (req: Request, res: Response) => {
  const idUserRole = req.params.id;
  const body = req.body;

  if (!body.nombreUserRole) {
    return res
      .status(400)
      .json({ error: "Petición inválida, falta nombre del rol de usuario" });
  }

  try {
    const userRole = await getManager().findOne(UserRole, {
      uuid: idUserRole,
    });
    if (!userRole) {
      return res
        .status(404)
        .json({ error: "El rol de usuario especificado no es existe" });
    }
    if (!userRole.active) {
      return res
        .status(403)
        .json({ error: "El rol de usuario especificado no es vigente" });
    }
    userRole.nombreUserRole = body.nombreUserRole;
    await getManager().save(userRole);
    return res.status(200).json(userRole);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userRoleRouter.delete("/userrole/:id", async (req: Request, res: Response) => {
  const idUserRole = req.params.id;
  try {
    const userRole = await getManager().findOne(UserRole, {
      uuid: idUserRole,
    });
    if (!userRole) {
      return res
        .status(404)
        .json({ error: "El rol de usuario especificado no es existe" });
    }
    if (!userRole.active) {
      return res
        .status(403)
        .json({ error: "El rol de usuario especificado no es vigente" });
    }
    userRole.fechaFinVigencia = new Date();
    userRole.active = false;
    await getManager().save(userRole);
    return res.status(204).json({
      mensaje: `El rol de usuario ${userRole.nombreUserRole} fue eliminado exitosamente`,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default userRoleRouter;
