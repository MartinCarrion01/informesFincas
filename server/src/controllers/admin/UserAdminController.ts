import express, { Request, Response } from "express";
import { UserRole } from "../../entities/UserRole";
import { User } from "../../entities/User";
import { getManager } from "typeorm";
import argon2 from "argon2";

const userAdminRouter = express.Router();

userAdminRouter.get("/user", async (_req: Request, res: Response) => {
  try {
    const users = await getManager()
      .createQueryBuilder(User, "usuario")
      .leftJoinAndSelect("usuario.rol", "rol")
      .where("rol.nombreUserRole = :recorredor", { recorredor: "recorredor" })
      .getMany();
    if (users.length !== 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ mensaje: "no se encontraron usuarios" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userAdminRouter.post("/user/register", async (req: Request, res: Response) => {
  const body = req.body;
  const userReg = new RegExp("^[0-9]+$");
  if (!userReg.test(body.dniUsuario)) {
    return res
      .status(400)
      .json({ mensaje: "El dni no puede contener letras, solo números" });
  }
  try {
    const checkingUser = await getManager().findOne(User, {
      select: ["active"],
      where: { dniUsuario: body.dniUsuario },
    });
    if (checkingUser) {
      if (checkingUser.active) {
        return res.status(400).json({
          mensaje:
            "El usuario que intenta registrar esta vigente en el sistema",
        });
      }
    }
    const userRole = await getManager().findOne(UserRole, {
      where: { uuid: body.userRoleUuid },
    });

    const password = await argon2.hash(body.dniUsuario);

    const user = getManager().create(User, {
      userName: body.username,
      nombreUsuario: body.nombreUsuario,
      apellidoUsuario: body.apellidoUsuario,
      dniUsuario: body.dniUsuario,
      legajoUsuario: body.legajoUsuario,
      password: password,
      rol: userRole,
    });
    await getManager().save(user);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userAdminRouter.put("/user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const body = req.body;

  try {
    const user = await getManager().findOne(User, { where: { uuid: userId } });
    if (!user) {
      return res
        .status(404)
        .json({ mensaje: "No existe el usuario que intenta modificar" });
    }
    if (body.rol !== "") {
      const userRole = await getManager().findOne(UserRole, {
        where: { uuid: body.userRoleUuid },
      });
      if (!userRole) {
        return res.status(404).end();
      }
      user.rol = userRole;
    }
    user.nombreUsuario = body.nombreUsuario;
    user.apellidoUsuario = body.apellidoUsuario;
    user.dniUsuario = body.dniUsuario;
    user.legajoUsuario = body.legajoUsuario;
    user.userName = body.userName;
    await getManager().save(user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userAdminRouter.delete("/user/:id", async (req: Request, res: Response) => {
  const idUser = req.params.id;
  try {
    const user = await getManager().findOne(User, {
      uuid: idUser,
    });
    if (!user) {
      return res
        .status(404)
        .json({ error: "El user especificado no es válido" });
    }
    if (!user.active) {
      return res
        .status(403)
        .json({ error: "El user especificado no es vigente" });
    }
    user.fechaFinVigencia = new Date();
    user.active = false;
    await getManager().save(user);
    return res.status(204).json({
      mensaje: `El user ${user.nombreUsuario} fue eliminado exitosamente`,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default userAdminRouter;
