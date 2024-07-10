import { Request, Response } from "express";
import * as AuthService from "../Services/auth";
export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);
  res.json(data);
}

export async function refresh(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.refresh(body);
  res.json(data);
}
