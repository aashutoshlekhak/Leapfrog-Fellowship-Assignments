import * as todoModel from "../model/todo";
import { Todo } from "../interfaces/todo";

export const getTodos = (userId: string) => todoModel.getTodos(userId);

export const getTodoById = (id: string, userId: string) => todoModel.getTodoById(id, userId);

export const addTodo = (todo: Todo, userId: string) => todoModel.addTodo(todo, userId);

export const deleteTodo = (id: string, userId: string) => todoModel.deleteTodo(id, userId);

export const updateTodo = (id: string, todo: Todo, userId: string) =>
  todoModel.updateTodo(id, todo, userId);
