import bcrypt from "bcrypt";
import { User } from "../interfaces/user";
import { getUserByEmail } from "../model/user";
import { sign, verify } from "jsonwebtoken";
import config from "../config";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import { UnauthenticatedError } from "../error/Errors";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Auth");
export async function login(body: Pick<User, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    throw new UnauthenticatedError("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {

    throw new UnauthenticatedError("Invalid email or password");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permission: existingUser.permission,
  };

  const accessToken = await generateAccessToken(payload);

  const refreshToken = await generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
  };
}

//to refresh access token using refresh token
export async function refresh(body: { refreshToken: string }) {
  const decoded = verify(body.refreshToken, config.jwt.secret!) as Pick<
    User,
    "id" | "name" | "email"
  >;

  // Extract the payload
  const { id, name, email } = decoded;
  const payload = { id, name, email };

  const accessToken = await generateAccessToken(payload);

  return { accessToken };
}
