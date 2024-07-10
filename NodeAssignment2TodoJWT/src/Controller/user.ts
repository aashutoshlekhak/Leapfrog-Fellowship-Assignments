import { Request, Response } from "express";
import * as userService from "../Services/user";

export function getUsers(req: Request, res: Response) {
  const { query } = req;

  const data = userService.getUsers();
  res.json(data);
}

export async function createUser(req: Request, res: Response) {
  const { body } = req;
  await userService.createUser(body);
  res.json({
    message: "User created",
  });
}
