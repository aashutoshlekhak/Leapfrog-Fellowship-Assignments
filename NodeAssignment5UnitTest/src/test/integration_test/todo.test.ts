import express from "express";
import request from "supertest";
import expect from "expect";
import todoRoutes from "../../routes/todo";
import { Todo } from "../../interfaces/todo";
import { todos } from "../../model/todo";
import config from "../../config";

const app = express();
app.use(express.json());
app.use("/todo", todoRoutes);

describe("Todo Integration Test Suite", () => {
  const testTodo: Todo = {
    id: "1",
    title: "Todo ",
    description: "Test Todo description",
    createdAt: new Date(),
    userId: "1",
  };

  describe("createTodo API Test", () => {
    it("should create a new todo", (done) => {
      request(app)
        .post("/todo")
        .set("Authorization", `Bearer ${config.testToken}`)
        .send({
          title: "New Test Todo",
          description: "New Test Todo description",
          createdAt: new Date(),
        })
        .expect(201)
        .then((response) => {
          expect(response.body.message).toBe("Todo added successfully");
          done();
        })
        .catch(done);
    });
  });

  describe("getTodos API Test", () => {
    it("should get all todos for a user", (done) => {
      request(app)
        .get("/todo")
        .set("Authorization", `Bearer ${config.testToken}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          done();
        })
        .catch(done);
    });
  });

  describe("getTodoById API Test", () => {
    it("should get todo by ID", (done) => {
      request(app)
        .get(`/todo/${testTodo.id}`)
        .set("Authorization", `Bearer ${config.testToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(testTodo.id);
          done();
        })
        .catch(done);
    });
  });

  describe("updateTodo API Test", () => {
    it("should update a todo", (done) => {
      request(app)
        .put(`/todo/${testTodo.id}`)
        .set("Authorization", `Bearer ${config.testToken}`)
        .send({
          title: "Todo test",
          description: "Todo 1 description",
          createdAt: new Date(),
        })
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe(
            `Todo with id ${testTodo.id} updated successfully`
          );
          done();
        })
        .catch(done);
    });
  });

  describe("deleteTodo API Test", () => {
    it("should delete a todo", (done) => {
      request(app)
        .delete(`/todo/${testTodo.id}`)
        .set("Authorization", `Bearer ${config.testToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe(
            `Todo with id ${testTodo.id} deleted successfully`
          );
          done();
        })
        .catch(done);
    });
  });
});
