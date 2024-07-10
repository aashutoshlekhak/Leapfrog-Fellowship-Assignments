import { Request, Response, NextFunction } from "express";
import config from "../config";
import { verify } from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Error("Unauthorized"));
    return;
  }

  const token = authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Unauthenticated"));

    return;
  }

  verify(token[1], config.jwt.secret!);

  next();
}
