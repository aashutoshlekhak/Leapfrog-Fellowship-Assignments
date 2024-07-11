import { Request, Response } from "express";
import * as userService from "../service/user";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");

export function getUsers(req: Request, res: Response) {
  const { query } = req;
  const data = userService.getUsers();
  logger.info(data);
  res.status(HttpStatusCodes.OK).json(data);
}

export async function createUser(req: Request, res: Response) {
  const { body } = req;
  const data = await userService.createUser(body);
  logger.info(data);
  res.status(HttpStatusCodes.CREATED).json(data);
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  await userService.deleteUser(id);
  logger.info(`User of ${id} deleted successfully`);
  res.status(HttpStatusCodes.OK).json(`User of ${id} deleted successfully`);
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  await userService.updateUser(id, req.body);
  logger.info(`User of ${id} updated successfully`);
  res.status(HttpStatusCodes.OK).json(`User of ${id} updated successfully`);
}
