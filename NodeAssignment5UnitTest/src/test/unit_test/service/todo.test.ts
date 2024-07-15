import {
  getTodos,
  getTodoById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../../../service/todo";

import sinon from "sinon";
import expect from "expect";
import * as todoModel from "../../../../src/model/todo";
import { NotFoundError } from "../../../error/Errors";
import { Todo } from "../../../interfaces/todo";

describe("Todo Service Test Suite", () => {
  describe("getTodos", () => {
    let todoModelGetTodosStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodosStub = sinon.stub(todoModel, "getTodos");
    });

    afterEach(() => {
      todoModelGetTodosStub.restore();
    });

    it("Should throw an error if no todos are found", () => {
      todoModelGetTodosStub.returns(undefined);

      expect(() => getTodos("1")).toThrow(new Error("Todos not found"));
    });

    it("Should return todos if todos are found", () => {
      const todos = [
        { id: "1", title: "Todo1", description: "Description1", userId: "1" },
        { id: "2", title: "Todo2", description: "Description2", userId: "1" },
      ];

      todoModelGetTodosStub.returns(todos);

      const response = getTodos("1");

      expect(response).toStrictEqual(todos);
    });
  });

  describe("getTodoById", () => {
    let todoModelGetTodoByIdStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodoByIdStub = sinon.stub(todoModel, "getTodoById");
    });

    afterEach(() => {
      todoModelGetTodoByIdStub.restore();
    });

    it("Should throw NotFoundError when todo is not found", () => {
      todoModelGetTodoByIdStub.returns(undefined);

      expect(() => getTodoById("100", "1")).toThrow(
        new NotFoundError("Todo not found")
      );
    });

    it("Should return todo if todo is found", () => {
      const todo = {
        id: "1",
        title: "Test Todo",
        description: "Test Description",
        userId: "1",
      };

      todoModelGetTodoByIdStub.returns(todo);

      const response = getTodoById("1", "1");

      expect(response).toStrictEqual(todo);
    });
  });

  describe("addTodo", () => {
    let todoModelAddTodoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelAddTodoStub = sinon.stub(todoModel, "addTodo");
    });

    afterEach(() => {
      todoModelAddTodoStub.restore();
    });

    it("Should add a new todo", () => {
      const todo: Todo = {
        id: "1",
        title: "New Todo",
        description: "New Description",
        userId: "1",
        createdAt: new Date(),
      };

      addTodo(todo, "1");

      expect(todoModelAddTodoStub.callCount).toBe(1);
      expect(todoModelAddTodoStub.getCall(0).args).toStrictEqual([todo, "1"]);
    });
  });

  describe("deleteTodo", () => {
    let todoModelGetTodoByIdStub: sinon.SinonStub;
    let todoModelDeleteTodoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodoByIdStub = sinon.stub(todoModel, "getTodoById");
      todoModelDeleteTodoStub = sinon.stub(todoModel, "deleteTodo");
    });

    afterEach(() => {
      todoModelGetTodoByIdStub.restore();
      todoModelDeleteTodoStub.restore();
    });

    it("Should throw NotFoundError when todo is not found", () => {
      todoModelGetTodoByIdStub.returns(undefined);

      expect(() => deleteTodo("100", "1")).toThrow(
        new NotFoundError("Todo of id 100 not found")
      );
    });

    it("Should delete todo if todo is found", () => {
      todoModelGetTodoByIdStub.returns({ id: "1" });

      deleteTodo("1", "1");

      expect(todoModelDeleteTodoStub.callCount).toBe(1);
      expect(todoModelDeleteTodoStub.getCall(0).args).toStrictEqual(["1", "1"]);
    });
  });
});
