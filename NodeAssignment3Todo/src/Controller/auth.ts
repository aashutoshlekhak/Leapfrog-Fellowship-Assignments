import { Request, Response } from "express";
import * as AuthService from "../service/auth";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthController");
export async function login(req: Request, res: Response) {
  const { body } = req;
  try {
    logger.info(`Login request with ${body}`);
    const data = await AuthService.login(body);
    res.json(data);
  } catch (e) {
    logger.error("Login failed", e);
    return res.sendStatus(401);
  }
}

export async function refresh(req: Request, res: Response) {
  const { body } = req;
  try {
    logger.info(`Refreshing the token`);
    const data = await AuthService.refresh(body);
    res.json(data);
  } catch (e) {
    logger.error("Refresh failed", e);
    return res.sendStatus(401);
  }
}
