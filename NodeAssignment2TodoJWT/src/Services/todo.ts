import * as todoModel from "../Models/todo";
import { Todo } from "../interfaces/todo";

export const getTodos = () => todoModel.getTodos();

export const getTodoById = (id: string) => todoModel.getTodoById(id);

export const addTodo = (todo: Todo) => todoModel.addTodo(todo);

export const deleteTodo = (id: string) => todoModel.deleteTodo(id);

export const updateTodo = (id: string, todo: Todo) =>
  todoModel.updateTodo(id, todo);
