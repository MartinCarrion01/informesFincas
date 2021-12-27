import express, { Request, Response } from "express";
import { User } from "../../entities/User";
import { getManager } from "typeorm";
import argon2 from "argon2";
import { auth } from "../../middleware/auth";

const userCommonRouter = express.Router();

userCommonRouter.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const userReg = new RegExp("^[0-9]+$");
  if (!userReg.test(body.dniUsuario)) {
    return res
      .status(400)
      .json({ mensaje: "El dni no puede contener letras, solo números" });
  }
  try {
    const users = await getManager().find(User, {
      relations: ["rol"],
      where: { dniUsuario: body.dniUsuario },
    });
    console.log('users', users)
    if (users.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "El usuario ingresado no existe" });
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].active) {
        if (users[i].password !== "") {
          const valid = await argon2.verify(users[i].password, body.password);
          if (!valid) {
            return res
              .status(400)
              .json({ mensaje: "La contraseña ingresada no es correcta" });
          }
        } else {
          if (body.password.trim() !== "") {
            return res
              .status(400)
              .json({ mensaje: "La contraseña ingresada no es correcta" });
          }
        }
        (req.session as any).userUuid = users[i].uuid;
        (req.session as any).userRole = users[i].rol.nombreUserRole;
        return res.status(200).json(users[i]);
      }
    }
    return res.status(400).json({
      mensaje:
        "El usuario ingresado no es vigente, cómunicarse con el administrador",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userCommonRouter.post("/logout", auth, async (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(400).json({ error });
    }
    res.clearCookie("qid");
    return res.json({ mensaje: "log out exitoso" });
  });
});

export default userCommonRouter;
