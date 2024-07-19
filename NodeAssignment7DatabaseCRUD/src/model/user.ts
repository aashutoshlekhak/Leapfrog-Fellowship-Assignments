import { ConflictError } from "../error/Errors";
import { User } from "../interfaces/user";
import { BaseModel } from "./base";

export let users: User[] = [
  {
    name: "apple",
    email: "apple@gmail.com",
    password: "$2b$10$N5J46uOEfQj.Ysb4dGIP5eHQ7qARmbRRF4m9.YM3PeDWmu1XZFdNi", //apple
    permission: ["admin"],
    id: "1",
  },
];

export class UserModel extends BaseModel {
  static async create(user: User) {
    try {
      const userToCreate = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      await this.queryBuilder().insert(userToCreate).table("users");
    } catch (error) {
      throw new ConflictError("User already exists");
    }
  }

  static getUsers() {
    try {
      return this.queryBuilder().select("id", "name", "email").table("users");
    } catch (error) {
      throw new ConflictError("User already exists");
    }
  }

  static getUsersById(id: string) {
    try {
      return this.queryBuilder()
        .select("id", "name", "email")
        .table("users")
        .where("id", id);
    } catch (error) {
      throw new ConflictError("User with given id does not exists");
    }
  }

  static getUserByEmail(email: string) {
    try {
      return this.queryBuilder()
        .select("id", "name", "email", "password")
        .table("users")
        .where({email}).first();
    } catch (error) {
      throw new ConflictError("User with given email does not exists");
    }
  }

  static async updateUser(id: string, user: User) {
    try {
      await this.queryBuilder().update(user).table("users").where("id", id);
    } catch (error) {
      throw new ConflictError("User with given id does not exists");
    }
  }

  static async deleteUser(id: string) {
    try {
      await this.queryBuilder().delete().table("users").where("id", id);
    } catch (error) {
      throw new ConflictError("User with given id does not exists");
    }
  }
}

export class PermissionModel extends BaseModel {
  static async checkPermission(userId: string) {
    const permissions = await this.queryBuilder()
      .select("p.permission")
      .from("roles as r")
      .join("userRoles as ur", "r.id", "ur.role_id")
      .join("rolePermissions as rp", "rp.role_id", "ur.role_id")
      .join("permissions as p", "rp.permission_id", "p.id")
      .where("ur.user_id", userId);
    return permissions;
  }
}

