import { BadRequestError, ConflictError, NotFoundError } from "../error/Errors";
import { User } from "../interfaces/user";
import { notFoundError } from "../middlewares/errorHandler";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";

export async function createUser(user: User) {
  try {
    const password = await bcrypt.hash(user.password, 10);
    await userModel.UserModel.create({ ...user, password });
    return {
      message: "User Created",
    };
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  const data = await userModel.UserModel.getUsers();
  if (!data) {
    throw new NotFoundError("User not found");
  }
  return data;
}

export async function getUserById(id: string) {
  try {
    const data = await userModel.UserModel.getUsersById(id);
    return data;
  } catch (error) {
    throw new NotFoundError(`User of id ${id} not found`);
  }
}

export async function getUserByEmail(email: string) {
  try {
    const data = userModel.UserModel.getUserByEmail(email);
    return data;
  } catch (error) {
    throw new NotFoundError(`User of email ${email} not found`);
  }
}

export const deleteUser = (id: string) => {
  try {
    userModel.UserModel.deleteUser(id);
  } catch (error) {
    throw new NotFoundError(`User of id ${id} not found`);
  }
};

export const updateUser = (id: string, body: User) => {
  try {
    userModel.UserModel.updateUser(id, body);
  } catch (error) {
    throw new NotFoundError(`User of id ${id} not found`);
  }
};
