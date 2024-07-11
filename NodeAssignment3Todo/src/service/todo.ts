import * as todoModel from "../model/todo";
import { Todo } from "../interfaces/todo";

export const getTodos = (userId: string) => {
  const todos = todoModel.getTodos(userId);
  if (!todos) {
    throw new Error("Todos not found");
  }
  return todos;
};

export const getTodoById = (id: string, userId: string) =>
  todoModel.getTodoById(id, userId);

export const addTodo = (todo: Todo, userId: string) =>
  todoModel.addTodo(todo, userId);

export const deleteTodo = (id: string, userId: string) =>
  todoModel.deleteTodo(id, userId);

export const updateTodo = (id: string, todo: Todo, userId: string) =>
  todoModel.updateTodo(id, todo, userId);
