import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import * as todoService from "../service/todo";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";

const logger = loggerWithNameSpace("TodoController");

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.id;
  try {
    const data = todoService.getTodos(userId);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (e) {
    logger.error(`Error fetching todos for user ${userId}: ${e.message}`);
    next(e);
  }
};

export const getTodoById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user!.id;
  const { id } = req.params;
  try {
    const data = todoService.getTodoById(id, userId);
    if (!data) {
      res.status(HttpStatusCodes.NOT_FOUND).json({ message: "No data found" });
      logger.warn(`Todo with id ${id} not found for user ${userId}`);
      return;
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (e) {
    logger.error(
      `Error fetching todo with id ${id} for user ${userId}: ${e.message}`
    );
    next(e);
  }
};

export const addTodo = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.id;
  const { body } = req;
  const newTodo = { ...body, createdAt: new Date() };

  try {
    todoService.addTodo(newTodo, userId);
    res.status(HttpStatusCodes.CREATED).json({
      message: "Todo added successfully",
    });
    logger.info(`Todo added successfully for user ${userId}`);
  } catch (e) {
    logger.error(`Error adding todo for user ${userId}: ${e.message}`);
    next(e);
  }
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.id;
  const { id } = req.params;
  try {
    todoService.deleteTodo(id, userId);
    res.status(HttpStatusCodes.OK).json({
      message: `Todo with id ${id} deleted successfully`,
    });
    logger.info(`Todo with id ${id} deleted successfully for user ${userId}`);
  } catch (e) {
    logger.error(
      `Error deleting todo with id ${id} for user ${userId}: ${e.message}`
    );
    next(e);
  }
};

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { body } = req;
  try {
    todoService.updateTodo(id, body, userId);
    res.status(HttpStatusCodes.OK).json({
      message: `Todo with id ${id} updated successfully`,
    });
    logger.info(`Todo with id ${id} updated successfully for user ${userId}`);
  } catch (e) {
    logger.error(
      `Error updating todo with id ${id} for user ${userId}: ${e.message}`
    );
    next(e);
  }
};
