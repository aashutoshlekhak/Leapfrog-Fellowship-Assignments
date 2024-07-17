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

let count = users.length;

// export function getUsers() {
//   return users;
// }

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId == id);
}

export function createUser(user: User) {
  count++;
  return users.push({
    ...user,
    id: `${count}`,
  });
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail == email);
}

export function deleteUser(id: string) {
  users = users.filter(({ id: userId }) => userId != id);
}

export function updateUser(id: string, body: User) {
  users = users.map((user) => (user.id == id ? { ...user, ...body } : user));
}
