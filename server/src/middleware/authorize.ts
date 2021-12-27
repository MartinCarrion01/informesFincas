import { NextFunction, Response } from "express";

export const authorize = (req: any, res: Response, next: NextFunction) => {
  if (!req.session.userRole) {
    return res.status(400).json({ mensaje: "debe logearse" });
  }
  if (req.session.userRole !== "admin") {
    return res
      .status(403)
      .json({
        mensaje:
          "Usted no tiene los permisos suficientes para realizar esta acción",
      });
  }
  return next();
};
