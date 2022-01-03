import express, { Request, Response } from "express";
import { User } from "../../entities/User";
import { getManager } from "typeorm";
import argon2 from "argon2";
import { auth } from "../../middleware/auth";

const userCommonRouter = express.Router();

userCommonRouter.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const user = await getManager().findOne(User, {
      relations: ["rol"],
      where: { userName: body.username },
    });
    console.log("user", user);
    if (!user) {
      return res
        .status(404)
        .json({ mensaje: "El usuario ingresado no existe" });
    }
    if (user.active) {
      if (user.password !== "") {
        const valid = await argon2.verify(user.password, body.password);
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
      (req.session as any).userUuid = user.uuid;
      (req.session as any).userRole = user.rol.nombreUserRole;
      return res.status(200).json(user);
    }
    return res.status(400).json({
      mensaje:
        "El usuario ingresado no es vigente, cómunicarse con el administrador",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userCommonRouter.post(
  "/changepassword",
  auth,
  async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const user = await getManager().findOne(User, {
        where: { uuid: (req.session as any).userUuid },
        relations: ["rol"],
      });
      if (!user) {
        return res.status(404).json({
          mensaje:
            "no existe el usuario al cual le desea cambiar la contraseña",
        });
      }
      const valid = await argon2.verify(user.password, body.oldpassword);
      if (!valid) {
        return res
          .status(400)
          .json({ mensaje: "La contraseña anterior ingresada no es correcta" });
      }
      if(body.password.trim() === ""){
        return res
          .status(400)
          .json({ mensaje: "La contraseña nueva no puede ser vacía" });
      }
      if(body.password.trim().length < 6){
        return res
          .status(400)
          .json({ mensaje: "La contraseña nueva no puede tener una longitud menor a 6 caracteres" });
      }
      user.password = await argon2.hash(body.password);
      await getManager().save(user);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);

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
