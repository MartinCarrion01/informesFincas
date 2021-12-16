import express, { Request, Response } from "express";

const fincaRouter = express.Router();

fincaRouter.get("/finca", async (_req: Request, _res: Response) => {
});

export default fincaRouter;
