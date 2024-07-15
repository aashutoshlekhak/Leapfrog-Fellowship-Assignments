import express from "express";
import request from "supertest";
import expect from "expect";
import userRoutes from "../../routes/user";
import { User } from "../../interfaces/user";
import { users } from "../../model/user";
import config from "../../config";

const app = express();
app.use(express.json());
app.use("/user", userRoutes);

describe("User Integration Test Suite", () => {
  const testUser: User = {
    id: "2",
    name: "testUser",
    email: "testUser@gmail.com",
    password: "$2b$10$abc",
    permission: [],
  };

  describe("createUser API Test", () => {
    it("should create a new user", (done) => {
      request(app)
        .post("/user")
        .set("Authorization", `Bearer ${config.testToken}`)
        .send({
          id: "3",
          name: "testUser2",
          email: "testUser2@gmail.com",
          password: "Password1235#@",
          permission: [],
        })
        .expect(201)
        .then((response) => {
          expect(response.body.message).toBe("User created");
          done();
        })
        .catch(done);
    });
  });

  describe("getUsers API Test", () => {
    it("should get all users", (done) => {
      request(app)
        .get("/user")
        .set("Authorization", `Bearer ${config.testToken}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          done();
        })
        .catch(done);
    });
  });

  describe("getUserById API Test", () => {
    it("should get user by ID", (done) => {
      request(app)
        .get(`/user/${testUser.id}`)
        .set("Authorization", `Bearer ${config.testToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(testUser.id);
          done();
        })
        .catch(done);
    });
  });

  describe("updateUser API Test", () => {
    it("should update a user", (done) => {
      request(app)
        .put(`/user/${testUser.id}`)
        .set("Authorization", `Bearer ${config.testToken}`)
        .send({
          name: "Updated Name",
          password: "UpdatedPassword123@",
          email: "appleball@cat.com",
        })
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("User updated");
          done();
        })
        .catch(done);
    });
  });

  describe("deleteUser API Test", () => {
    it("should delete a user", (done) => {
      request(app)
        .delete(`/user/${testUser.id}`)
        .set("Authorization", `Bearer ${config.testToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("User deleted");
          done();
        })
        .catch(done);
    });
  });
});
