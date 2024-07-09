import { Request, Response } from "express";
import * as todoService from "../Services/todo";
import { create } from "domain";

export const getTodos = (req: Request, res: Response) => {
  const data = todoService.getTodos();
  if (!data){
    res.send("No data found");
  }
  res.send(data);
};

export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = todoService.getTodoById(id);
  if (!data){
    res.send("No data found");
  }
  res.send(data);
};

export const addTodo = (req: Request, res: Response) => {
  const { body } = req;
  const newTodo = { ...body, createdAt: new Date() };

  todoService.addTodo(newTodo);
  res.json({
    message: "Todo added successfully",
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  todoService.deleteTodo(id);
  res.json({
    message: `Todo with id ${id} deleted successfully`,
  });
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  todoService.updateTodo(id, body);
  res.json({
    message: `Todo with id ${id} updated successfully`,
  });
};
