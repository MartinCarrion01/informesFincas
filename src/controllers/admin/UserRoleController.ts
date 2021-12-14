import express, { Request, Response } from "express";
import { UserRole } from "../../entities/UserRole";
import { DI } from "../../index";

const userRoleRouter = express.Router();

userRoleRouter.get("/userrole", async (_req: Request, res: Response) => {
  try {
    const userRoles = await DI.em.find(UserRole, {});
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
    const userRole = DI.em.create(UserRole, {
      nombreUserRole: body.nombreUserRole,
    });
    await DI.em.persistAndFlush(userRole);
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
    const userRole = await DI.em.findOne(UserRole, {
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
    await DI.em.persistAndFlush(userRole);
    return res.status(200).json(userRole);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userRoleRouter.delete("/userrole/:id", async (req: Request, res: Response) => {
  const idUserRole = req.params.id;
  try {
    const userRole = await DI.em.findOne(UserRole, {
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
    userRole.active = false;
    await DI.em.persistAndFlush(userRole);
    return res.status(204).json({
      mensaje: `El rol de usuario ${userRole.nombreUserRole} fue eliminado exitosamente`,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default userRoleRouter;
