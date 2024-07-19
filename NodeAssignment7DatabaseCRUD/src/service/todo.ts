import * as todoModel from "../model/todo";
import { Todo } from "../interfaces/todo";
import { NotFoundError } from "../error/Errors";

export const getTodos = (userId: string) => {
  const todos = todoModel.TodoModel.getTodos(userId);
  if (!todos) {
    throw new Error("Todos not found");
  }
  return todos;
};

export const getTodoById = (id: string, userId: string) => {
  const todo = todoModel.TodoModel.getTodoById(id, userId);
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
  return todo;
};

export const addTodo = (todo: Todo, userId: string) =>
  todoModel.TodoModel.create(todo, userId);

export const deleteTodo = (id: string, userId: string) => {
  const todo = todoModel.TodoModel.getTodoById(id, userId);
  if (!todo) {
    throw new NotFoundError(`Todo of id ${id} not found`);
  }
  todoModel.TodoModel.deleteTodo(id, userId);
};

export const updateTodo = (id: string, todo: Todo, userId: string) => {
  const oldTodo = todoModel.TodoModel.getTodoById(id, userId);
  if (!oldTodo) {
    throw new NotFoundError(`Todo of id ${id} not found`);
  }
  todoModel.TodoModel.updateTodo(id, todo, userId);
};
