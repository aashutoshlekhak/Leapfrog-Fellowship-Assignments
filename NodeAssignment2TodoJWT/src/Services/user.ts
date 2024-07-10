import { User } from "../interfaces/user";
import * as userModel from "../Models/user";
import bcrypt from "bcrypt";

export async function createUser(user: User) {
  const password = await bcrypt.hash(user.password, 10);
  userModel.createUser({ ...user, password });
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
