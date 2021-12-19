import { NextFunction, Response } from "express";

export const auth = (req: any, res: Response, next: NextFunction) => {
  if (!req.session.userUuid) {
    return res.status(400).json({ mensaje: "debe logearse" });
  }
  return next();
};
