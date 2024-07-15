import { BadRequestError, ConflictError, NotFoundError } from "../error/Errors";
import { User } from "../interfaces/user";
import { notFoundError } from "../middlewares/errorHandler";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";

export async function createUser(user: User) {
  const existingUser = userModel.getUserByEmail(user.email);
  if (existingUser) {
    throw new ConflictError("User already exists");
  }
  const password = await bcrypt.hash(user.password, 10);
  userModel.createUser({ ...user, password });
  return { ...user, password };
}

export function getUsers() {
  const data = userModel.getUsers();
  if (!data) {
    throw new NotFoundError("User not found");
  }
  return data;
}

export function getUserById(id: string) {
  const data = userModel.getUserById(id);
  if (!data) {
    throw new BadRequestError(`User of id ${id} not found`);
  }
  return data;
}

export function getUserByEmail(email: string) {
  const data = userModel.getUserByEmail(email);
  if (!data) {
    throw new NotFoundError(`User not found with email ${email}`);
  }
  return data;
}

export const deleteUser = (id: string) => {
  const data = userModel.getUserById(id);
  if (!data) {
    throw new NotFoundError(`User of id ${id} not found`);
  }
  userModel.deleteUser(id);
};

export const updateUser = (id: string, body: User) => {
  const data = userModel.getUserById(id);
  if (!data) {
    throw new NotFoundError(`User of id ${id} not found`);
  }
  userModel.updateUser(id, body);
};
