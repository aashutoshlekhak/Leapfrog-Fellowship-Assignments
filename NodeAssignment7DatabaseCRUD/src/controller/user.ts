import { NextFunction, Request, Response } from "express";
import * as userService from "../service/user";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;
    const data = await userService.getUsers();
    logger.info(data);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = userService.getUserById(id);
    logger.info(data);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const message = await userService.createUser(body);
    res.status(HttpStatusCodes.CREATED).json({ message });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  await userService.deleteUser(id);
  logger.info(`User of ${id} deleted successfully`);
  res
    .status(HttpStatusCodes.OK)
    .json({ message: `User of ${id} deleted successfully` });
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  await userService.updateUser(id, req.body);
  logger.info(`User of ${id} updated successfully`);
  res
    .status(HttpStatusCodes.OK)
    .json({ message: `User of id ${id} updated successfully` });
}
