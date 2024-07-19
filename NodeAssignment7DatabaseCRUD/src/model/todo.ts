import { Todo } from "../interfaces/todo";
import { BaseModel } from "./base";

export let todos: Todo[] = [
  {
    id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    createdAt: new Date(),
    userId: "1",
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Todo 2 description",
    createdAt: new Date(),
    userId: "1",
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Todo 3 description",
    createdAt: new Date(),
    userId: "2",
  },
];

let count = todos.length;



export class TodoModel extends BaseModel {
  static async create(todo: Todo, userId: string) {
    try {
      const todoToCreate = {
        ...todo,
        userId: userId,
      };
      await this.queryBuilder().insert(todoToCreate).table("todos");
    } catch (error) {
      throw new error();
    }
  }

  static getTodos(userId: string) {
    try {
      return this.queryBuilder()
        .select("*")
        .table("todos")
        .where("userId", userId);
    } catch (error) {
      throw new error();
    }
  }

  static getTodoById(id: string, userId: string) {
    try {
      return this.queryBuilder()
        .select("*")
        .table("todos")
        .where({ id, userId })
        .first();
    } catch (error) {
      throw new error();
    }
  }

  static async deleteTodo(id: string, userId: string) {
    try {
      await this.queryBuilder().delete().table("todos").where({ id, userId });
    } catch (error) {
      throw new error();
    }
  }

  static async updateTodo(id: string, todo: Todo, userId: string) {
    try {
      await this.queryBuilder()
        .update(todo)
        .table("todos")
        .where({ id, userId });
    } catch (error) {
      throw new error();
    }
  }
}
