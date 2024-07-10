import bcrypt from "bcrypt";
import { User } from "../interfaces/user";
import { getUserByEmail } from "../Models/user";
import { sign, verify } from "jsonwebtoken";
import config from "../config";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
export async function login(body: Pick<User, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  //   const accessToken = await sign(payload, config.jwt.secret!, {
  //     expiresIn: config.jwt.accessTokenExpiryMS,
  //   });

  const accessToken = await generateAccessToken(payload);

  //   const refreshToken = await sign(payload, config.jwt.secret!, {
  //     expiresIn: config.jwt.refreshTokenExpiryMS,
  //   });

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
  const refreshToken = await generateRefreshToken(payload);

  return { accessToken, refreshToken };
}

