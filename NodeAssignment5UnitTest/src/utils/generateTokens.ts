import { sign } from "jsonwebtoken";
import config from "../config";
import { User } from "../interfaces/user";

const secret = config.jwt.secret!;

export async function generateAccessToken(
  payload: Pick<User, "id" | "name" | "email">
) {
  return await sign(payload, secret, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
}

export async function generateRefreshToken(
  payload: Pick<User, "id" | "name" | "email">
) {
  return await sign(payload, secret, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });
}
