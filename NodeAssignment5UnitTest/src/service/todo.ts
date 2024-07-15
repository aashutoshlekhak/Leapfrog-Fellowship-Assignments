import * as todoModel from "../model/todo";
import { Todo } from "../interfaces/todo";
import { NotFoundError } from "../error/Errors";

export const getTodos = (userId: string) => {
  const todos = todoModel.getTodos(userId);
  if (!todos) {
    throw new Error("Todos not found");
  }
  return todos;
};

export const getTodoById = (id: string, userId: string) => {
  const todo = todoModel.getTodoById(id, userId);
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
  return todo;
};

export const addTodo = (todo: Todo, userId: string) =>
  todoModel.addTodo(todo, userId);

export const deleteTodo = (id: string, userId: string) => {
  const todo = todoModel.getTodoById(id, userId);
  if (!todo) {
    throw new NotFoundError(`Todo of id ${id} not found`);
  }
  todoModel.deleteTodo(id, userId);
};

export const updateTodo = (id: string, todo: Todo, userId: string) => {
  const oldTodo = todoModel.getTodoById(id, userId);
  if (!oldTodo) {
    throw new NotFoundError(`Todo of id ${id} not found`);
  }
  todoModel.updateTodo(id, todo, userId);
};
