import {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  updateUser,
} from "../../../service/user";

import sinon from "sinon";
import expect from "expect";
import bcrypt from "bcrypt";
import * as UserModel from "../../../../src/model/user";

import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../../error/Errors";
import { User } from "../../../interfaces/user";

describe("User Service Test Suite", () => {
  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelGetUserByEmailStub: sinon.SinonStub;
    let userModelCreateUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
      userModelCreateUserStub = sinon.stub(UserModel, "createUser");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      userModelGetUserByEmailStub.restore();
      userModelCreateUserStub.restore();
    });

    it("Should throw ConflictError if user already exists", async () => {
      userModelGetUserByEmailStub.returns({ id: "1", email: "test@test.com" });

      await expect(
        createUser({
          email: "test@test.com",
          password: "test1234",
          name: "test",
          id: "1",
          permission: ["admin"],
        })
      ).rejects.toThrow(new ConflictError("User already exists"));

      expect(userModelGetUserByEmailStub.callCount).toBe(1);
    });

    it("Should create new user", async () => {
      userModelGetUserByEmailStub.returns(undefined);
      bcryptHashStub.resolves("hashedPassword");

      const user: User = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permission: [],
      };

      const response = await createUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(userModelCreateUserStub.callCount).toBe(1);
      expect(userModelCreateUserStub.getCall(0).args).toStrictEqual([
        { ...user, password: "hashedPassword" },
      ]);

      expect(response).toStrictEqual({ ...user, password: "hashedPassword" });
    });
  });

  describe("getUsers", () => {
    let userModelGetUsersStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUsersStub = sinon.stub(UserModel, "getUsers");
    });

    afterEach(() => {
      userModelGetUsersStub.restore();
    });

    it("Should throw NotFoundError if no users are found", () => {
      userModelGetUsersStub.returns(undefined);

      expect(() => getUsers()).toThrow(new NotFoundError("User not found"));
    });

    it("Should return users if users are found", () => {
      const users = [
        { id: "1", name: "User1", email: "user1@test.com" },
        { id: "2", name: "User2", email: "user2@test.com" },
      ];

      userModelGetUsersStub.returns(users);

      const response = getUsers();

      expect(response).toStrictEqual(users);
    });
  });

  describe("getUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("Should throw BadRequestError when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(() => getUserById("100")).toThrow(
        new BadRequestError("User of id 100 not found")
      );
    });

    it("Should return user if user is found", () => {
      const user = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      userModelGetUserByIdStub.returns(user);

      const response = getUserById("1");

      expect(response).toStrictEqual(user);
    });
  });

  describe("getUserByEmail", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
    });

    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });

    it("Should throw NotFoundError when user is not found", () => {
      userModelGetUserByEmailStub.returns(undefined);

      expect(() => getUserByEmail("test@test.com")).toThrow(
        new NotFoundError("User not found with email test@test.com")
      );
    });

    it("Should return user if user is found", () => {
      const user = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      userModelGetUserByEmailStub.returns(user);

      const response = getUserByEmail("test@test.com");

      expect(response).toStrictEqual(user);
    });
  });

  describe("deleteUser", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;
    let userModelDeleteUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
      userModelDeleteUserStub = sinon.stub(UserModel, "deleteUser");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
      userModelDeleteUserStub.restore();
    });

    it("Should throw NotFoundError when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(() => deleteUser("100")).toThrow(
        new NotFoundError("User of id 100 not found")
      );
    });

    it("Should delete user if user is found", () => {
      userModelGetUserByIdStub.returns({ id: "1" });

      deleteUser("1");

      expect(userModelDeleteUserStub.callCount).toBe(1);
      expect(userModelDeleteUserStub.getCall(0).args).toStrictEqual(["1"]);
    });
  });
});
