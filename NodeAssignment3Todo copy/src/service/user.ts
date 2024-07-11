import { User } from "../interfaces/user";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";

export async function createUser(user: User) {
  const password = await bcrypt.hash(user.password, 10);
  userModel.createUser({ ...user, password });
  return { ...user, password };
}

export function getUsers() {
  return userModel.getUsers();
}

export function getUserByEmail(email: string) {
  const data = userModel.getUserByEmail(email);
  if (!data) {
    throw new Error("User not found");
  }
  return data;
}

export const deleteUser = (id: string) => userModel.deleteUser(id);

export const updateUser = (id: string, body: User) =>
  userModel.updateUser(id, body);
