import { Response } from "express";
import { Request } from "../interfaces/auth";
import * as todoService from "../service/todo";
import { create } from "domain";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";

const logger = loggerWithNameSpace("TodoController");

export const getTodos = (req: Request, res: Response) => {
  const userId = req.user!.id;
  console.log(`userid: ${req.user?.id}`);
  const data = todoService.getTodos(userId);
  if (!data) {
    res.send("No data found");
  }
  res.send(data);
};

export const getTodoById = (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const data = todoService.getTodoById(id, userId);
  if (!data) {
    res.send("No data found");
  }
  res.send(data);
};

export const addTodo = (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { body } = req;
  const newTodo = { ...body, createdAt: new Date() };

  todoService.addTodo(newTodo, userId);
  res.json({
    message: "Todo added successfully",
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  todoService.deleteTodo(id, userId);
  res.json({
    message: `Todo with id ${id} deleted successfully`,
  });
};

export const updateTodo = (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { body } = req;
  todoService.updateTodo(id, body, userId);
  res.json({
    message: `Todo with id ${id} updated successfully`,
  });
};
